import { CompassProvider, TokensApiProvider } from '@poap-xyz/providers';
import { POAP } from './domain/Poap';
import { POAPReservation } from './domain/POAPReservation';
import { PaginatedPoapsResponse, PAGINATED_POAPS_QUERY } from './queries';
import {
  FetchPoapsInput,
  EmailReservationInput,
  WalletMintInput,
} from './types';
import {
  PaginatedResult,
  nextCursor,
  createBetweenFilter,
  creatEqFilter,
  createInFilter,
  createUndefinedOrder,
  creatAddressFilter,
  MintingStatus,
} from '@poap-xyz/utils';
import { CodeAlreadyMintedError } from './errors/CodeAlreadyMintedError';
import { CodeExpiredError } from './errors/CodeExpiredError';
import { MintChecker } from './utils/MintChecker';
import { PoapIndexed } from './utils/PoapIndexed';
import { PoapMintStatus } from './types/response';

/**
 * Represents a client for interacting with POAPs .
 * @class
 */
export class PoapsClient {
  /**
   * Initializes a new instance of the PoapsClient.
   * @param {CompassProvider} compassProvider - The provider for the POAP compass API.
   * @param {TokensApiProvider} tokensApiProvider - The provider for the Tokens API.
   */
  constructor(
    private compassProvider: CompassProvider,
    private tokensApiProvider: TokensApiProvider,
  ) {}

  /**
   * Fetches a list of POAP tokens based on the given input criteria.
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
      filterByZeroAddress = true,
    } = input;

    const variables = {
      limit,
      offset,
      orderBy: createUndefinedOrder(sortField, sortDir),
      where: {
        ...creatAddressFilter(
          'collector_address',
          filterByZeroAddress,
          collectorAddress,
        ),
        ...creatEqFilter('chain', chain),
        ...creatEqFilter('drop_id', dropId),
        ...createBetweenFilter('minted_on', mintedDateFrom, mintedDateTo),
        ...createInFilter('id', ids),
      },
    };

    const { data } = await this.compassProvider.request<PaginatedPoapsResponse>(
      PAGINATED_POAPS_QUERY,
      variables,
    );
    const poaps = data.poaps.map((poap) => {
      const { drop } = poap;
      const mintedOn = new Date(0);
      mintedOn.setUTCSeconds(poap.minted_on);
      return new POAP({
        id: Number(poap.id),
        collectorAddress: poap.collector_address,
        transferCount: poap.transfer_count,
        mintedOn,
        dropId: Number(poap.drop_id),
        imageUrl: drop.image_url,
        city: drop.city,
        country: drop.country,
        description: drop.description,
        startDate: new Date(drop.start_date),
        name: drop.name,
        endDate: new Date(drop.end_date),
      });
    });

    return new PaginatedResult<POAP>(
      poaps,
      nextCursor(poaps.length, limit, offset),
    );
  }

  /**
   * Retrieves the secret code associated with a POAP code.
   * @async
   * @param {string} mintCode - The POAP code for which to get the secret.
   * @returns {Promise<string>} The associated secret code.
   * @throws {CodeAlreadyMintedError} Thrown when the POAP code has already been minted.
   * @throws {CodeExpiredError} Thrown when the POAP code is expired.
   */
  private async getSecretCode(mintCode: string): Promise<string> {
    const getCodeResponse = await this.getMintCode(mintCode);

    if (getCodeResponse.minted == true) {
      throw new CodeAlreadyMintedError(mintCode);
    }
    if (getCodeResponse.isActive == false) {
      throw new CodeExpiredError(mintCode);
    }

    return getCodeResponse.secretCode;
  }

  /**
   * Retrieves mint code details for a specific Mint Code.
   * @async
   * @param {string} mintCode - The Mint Code for which to get the mint code.
   * @returns {Promise<GetMintCodeResponse>} The mint code details.
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
   * Fetches the current status of a mint based on its unique ID.
   * @async
   * @param {string} queueUid - The unique ID of the mint.
   * @returns {Promise<MintingStatus>} The current status of the mint.
   */
  async getMintStatus(queueUid: string): Promise<MintingStatus> {
    const mintStatusResponse = await this.tokensApiProvider.mintStatus(
      queueUid,
    );
    return mintStatusResponse.status;
  }

  /**
   * Awaits until the mint's status changes from 'IN_PROCESS' or 'PENDING'.
   * @async
   * @param {string} queueUid - The unique ID of the mint.
   * @returns {Promise<void>}
   */
  async waitMintStatus(queueUid: string, mintCode: string): Promise<void> {
    const checker = new MintChecker(queueUid, this.tokensApiProvider, mintCode);
    await checker.checkMintStatus();
  }

  /**
   * Awaits until a specific POAP, identified by its Mint Code, is indexed on our database.
   * @async
   * @param {string} mintCode - The Mint Code identifying the POAP to be indexed.
   * @returns {Promise<GetMintCodeResponse>} Details of the indexed POAP.
   */
  async waitPoapIndexed(mintCode: string): Promise<PoapMintStatus> {
    const checker = new PoapIndexed(mintCode, this.tokensApiProvider);
    return await checker.waitPoapIndexed();
  }

  /**
   * Begins an asynchronous mint process and provides a unique queue ID in return.
   * @async
   * @param {WalletMintInput} input - Details required for the mint.
   * @returns {Promise<string>} A unique queue ID for the initiated mint.
   */
  async mintAsync(input: WalletMintInput): Promise<string> {
    const secretCode = await this.getSecretCode(input.mintCode);

    const response = await this.tokensApiProvider.postMintCode({
      address: input.address,
      qr_hash: input.mintCode,
      secret: secretCode,
      sendEmail: false,
    });

    return response.queue_uid;
  }

  /**
   * Starts a synchronous mint process. The method waits for the mint to be processed and then
   * fetches the associated POAP. It combines the asynchronous mint and subsequent status checking
   * into a synchronous process for ease of use.
   * @async
   * @param {WalletMintInput} input - Details needed for the mint.
   * @returns {Promise<POAP>} The associated POAP upon successful mint completion.
   * @throws {FinishedWithError} If there's an error concluding the mint process.
   */
  async mintSync(input: WalletMintInput): Promise<POAP> {
    const queueUid = await this.mintAsync(input);

    await this.waitMintStatus(queueUid, input.mintCode);

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
   * @async
   * @param {EmailReservationInput} input - Information for the reservation.
   * @returns {Promise<POAPReservation>} The reservation details of the POAP.
   */
  async emailReservation(
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
}
