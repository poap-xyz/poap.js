import { POAP } from './domain/POAP';
import { POAPReservation } from './domain/POAPReservation';
import {
  PAGINATED_POAPS_QUERY,
  PaginatedPoapsResponse,
  PaginatedPoapsVariables,
} from './queries/PaginatedPoaps';
import { FetchPoapsInput } from './types/FetchPoapsInput';
import { PoapsSortFields } from './types/PoapsSortFields';
import { PoapMintStatus } from './types/PoapMintStatus';
import { WalletMintInput } from './types/WalletMintInput';
import { EmailReservationInput } from './types/EmailReservationInput';
import { CodeAlreadyMintedError } from './errors/CodeAlreadyMintedError';
import { CodeExpiredError } from './errors/CodeExpiredError';
import { MintChecker } from './utils/MintChecker';
import { PoapIndexed } from './utils/PoapIndexed';
import { CompassProvider, TokensApiProvider, Transaction } from '../providers';
import {
  createAddressFilter,
  createBetweenFilter,
  createEqFilter,
  createInFilter,
  createNotNullAddressFilter,
  createOrderBy,
  nextCursor,
  PaginatedResult,
} from '../utils';

/**
 * Represents a client for interacting with POAPs.
 *
 * @class
 */
export class PoapsClient {
  /**
   * Initializes a new instance of the PoapsClient.
   *
   * @param {CompassProvider} compassProvider - The provider for the POAP compass API.
   * @param {TokensApiProvider} tokensApiProvider - The provider for the Tokens API.
   */
  constructor(
    private compassProvider: CompassProvider,
    private tokensApiProvider: TokensApiProvider,
  ) {}

  /**
   * Fetches a list of POAP tokens based on the given input criteria.
   *
   * @async
   * @param {FetchPoapsInput} input - Criteria for fetching POAP tokens.
   * @returns {Promise<PaginatedResult<POAP>>} A paginated list of POAP tokens.
   */
  async fetch(input: FetchPoapsInput): Promise<PaginatedResult<POAP>> {
    const {
      limit,
      offset,
      chain,
      collectorAddress,
      mintedDateFrom,
      mintedDateTo,
      ids,
      dropId,
      sortField,
      sortDir,
      filterZeroAddress = true,
      filterDeadAddress = true,
    } = input;

    const variables: PaginatedPoapsVariables = {
      limit,
      offset,
      orderBy: createOrderBy<PoapsSortFields>(sortField, sortDir),
      where: {
        ...createAddressFilter('collector_address', collectorAddress),
        ...(collectorAddress == undefined
          ? createNotNullAddressFilter(
              'collector_address',
              filterZeroAddress,
              filterDeadAddress,
            )
          : {}),
        ...createEqFilter('chain', chain),
        ...createEqFilter('drop_id', dropId),
        ...createBetweenFilter('minted_on', mintedDateFrom, mintedDateTo),
        ...createInFilter('id', ids),
      },
    };

    const { data } = await this.compassProvider.request<
      PaginatedPoapsResponse,
      PaginatedPoapsVariables
    >(PAGINATED_POAPS_QUERY, variables);

    const poaps = data.poaps.map((poap) => POAP.fromCompass(poap));

    return new PaginatedResult<POAP>(
      poaps,
      nextCursor(poaps.length, limit, offset),
    );
  }

  /**
   * Retrieves mint code details for a specific Mint Code.
   *
   * @async
   * @param {string} mintCode - The Mint Code for which to get the mint code.
   * @returns {Promise<PoapMintStatus>} The Mint status.
   */
  async getMintCode(mintCode: string): Promise<PoapMintStatus> {
    const getMintCodeRaw = await this.tokensApiProvider.getMintCode(mintCode);
    return {
      minted: getMintCodeRaw.claimed,
      isActive: getMintCodeRaw.is_active,
      secretCode: getMintCodeRaw.secret,
      poapId: getMintCodeRaw.result?.token,
    };
  }

  /**
   * Gets the transaction associated with the mint.
   * The transaction could change in case of a bump.
   * It returns null if the mint has no transaction associated.
   *
   * @param {string} qrHash - The qrHash of the mint.
   * @returns {Promise<Transaction> | null} Returns the transaction associated with the mint. Null if no transaction is found.
   */
  public async getMintTransaction(qrHash: string): Promise<Transaction | null> {
    return await this.tokensApiProvider.getMintTransaction(qrHash);
  }

  /**
   * Awaits until we have a final Transaction status for a specific Mint Code.
   *
   * @async
   * @returns {Promise<void>}
   * @param mintCode - The Mint Code
   */
  public async waitMintStatus(mintCode: string): Promise<void> {
    const checker = new MintChecker(this.tokensApiProvider, mintCode);
    await checker.checkMintStatus();
  }

  /**
   * Awaits until a specific POAP, identified by its Mint Code, is indexed on our database.
   *
   * @async
   * @param {string} mintCode - The Mint Code identifying the POAP to be indexed.
   * @returns {Promise<PoapMintStatus>} - The status of the POAP mint.
   */
  public async waitPoapIndexed(mintCode: string): Promise<PoapMintStatus> {
    const checker = new PoapIndexed(this.tokensApiProvider, mintCode);
    return await checker.waitPoapIndexed();
  }

  /**
   * Begins an asynchronous mint process and provides a unique queue ID in return.
   *
   * @async
   * @param {WalletMintInput} input - Details required for the mint.
   */
  public async mintAsync(input: WalletMintInput): Promise<void> {
    const secretCode = await this.getSecretCode(input.mintCode);

    await this.tokensApiProvider.postMintCode({
      address: input.address,
      qr_hash: input.mintCode,
      secret: secretCode,
      sendEmail: false,
    });
  }

  /**
   * Starts a synchronous mint process. The method waits for the mint to be processed and then
   * fetches the associated POAP. It combines the asynchronous mint and subsequent status checking
   * into a synchronous process for ease of use.
   *
   * @async
   * @param {WalletMintInput} input - Details needed for the mint.
   * @returns {Promise<POAP>} The associated POAP upon successful mint completion.
   * @throws {FinishedWithError} If there's an error concluding the mint process.
   */
  async mintSync(input: WalletMintInput): Promise<POAP> {
    await this.mintAsync(input);

    await this.waitMintStatus(input.mintCode);

    const getCodeResponse = await this.waitPoapIndexed(input.mintCode);

    return (
      await this.fetch({
        limit: 1,
        offset: 0,
        ids: [getCodeResponse.poapId],
      })
    ).items[0];
  }

  /**
   * Reserves a POAP to an email address and provides reservation details.
   *
   * @async
   * @param {EmailReservationInput} input - Information for the reservation.
   * @returns {Promise<POAPReservation>} The reservation details of the POAP.
   */
  public async emailReservation(
    input: EmailReservationInput,
  ): Promise<POAPReservation> {
    const secretCode = await this.getSecretCode(input.mintCode);

    const response = await this.tokensApiProvider.postMintCode({
      address: input.email,
      qr_hash: input.mintCode,
      secret: secretCode,
      sendEmail: input.sendEmail || true,
    });

    return new POAPReservation({
      email: input.email,
      dropId: response.event.id,
      imageUrl: response.event.image_url,
      city: response.event.city,
      country: response.event.country,
      description: response.event.description,
      startDate: new Date(response.event.start_date),
      endDate: new Date(response.event.end_date),
      name: response.event.name,
    });
  }

  /**
   * Retrieves the secret code associated with a POAP code.
   *
   * @async
   * @param {string} mintCode - The POAP code for which to get the secret.
   * @returns {Promise<string>} The associated secret code.
   * @throws {CodeAlreadyMintedError} Thrown when the POAP code has already been minted.
   * @throws {CodeExpiredError} Thrown when the POAP code is expired.
   */
  private async getSecretCode(mintCode: string): Promise<string> {
    const getCodeResponse = await this.getMintCode(mintCode);

    if (getCodeResponse.minted) {
      throw new CodeAlreadyMintedError(mintCode);
    }
    if (!getCodeResponse.isActive) {
      throw new CodeExpiredError(mintCode);
    }

    return getCodeResponse.secretCode;
  }
}
