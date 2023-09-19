import {
  CompassProvider,
  TokensApiProvider,
  GetClaimCodeResponse,
} from '@poap-xyz/providers';
import { POAP } from './domain/Poap';
import { POAPReservation } from './domain/POAPReservation';
import { PaginatedPoapsResponse, PAGINATED_POAPS_QUERY } from './queries';
import { FetchPoapsInput, EmailClaimInput, WalletClaimInput } from './types';
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
import { CodeAlreadyClaimedError } from './errors/CodeAlreadyClaimedError';
import { CodeExpiredError } from './errors/CodeExpiredError';
import { ClaimChecker } from './utils/ClaimChecker';
import { PoapIndexed } from './utils/PoapIndexed';

/**
 * Represents a client for interacting with POAPs (Proof of Attendance Protocol tokens).
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
   * @param {string} poapCode - The POAP code for which to get the secret.
   * @returns {Promise<string>} The associated secret code.
   * @throws {CodeAlreadyClaimedError} Thrown when the POAP code has already been claimed.
   * @throws {CodeExpiredError} Thrown when the POAP code is expired.
   */
  private async getSecretCode(poapCode: string): Promise<string> {
    const getCodeResponse = await this.getClaimCode(poapCode);

    if (getCodeResponse.claimed == true) {
      throw new CodeAlreadyClaimedError(poapCode);
    }
    if (getCodeResponse.is_active == false) {
      throw new CodeExpiredError(poapCode);
    }

    return getCodeResponse.secret;
  }

  /**
   * Retrieves claim code details for a specific QR hash.
   * @async
   * @param {string} poapCode - The QR hash for which to get the claim code.
   * @returns {Promise<GetClaimCodeResponse>} The claim code details.
   */
  async getClaimCode(poapCode: string): Promise<GetClaimCodeResponse> {
    return await this.tokensApiProvider.getClaimCode(poapCode);
  }

  /**
   * Fetches the current status of a claim based on its unique ID.
   * @async
   * @param {string} queueUid - The unique ID of the claim.
   * @returns {Promise<MintingStatus>} The current status of the claim.
   */
  async getClaimStatus(queueUid: string): Promise<MintingStatus> {
    const claimStatusResponse = await this.tokensApiProvider.claimStatus(
      queueUid,
    );
    return claimStatusResponse.status;
  }

  /**
   * Awaits until the claim's status changes from 'IN_PROCESS' or 'PENDING'.
   * @async
   * @param {string} queueUid - The unique ID of the claim.
   * @returns {Promise<void>}
   */
  async waitClaimStatus(queueUid: string, poapCode: string): Promise<void> {
    const checker = new ClaimChecker(
      queueUid,
      this.tokensApiProvider,
      poapCode,
    );
    await checker.checkClaimStatus();
  }

  /**
   * Awaits until a specific POAP, identified by its QR hash, is indexed.
   * @async
   * @param {string} poapCode - The QR hash identifying the POAP to be indexed.
   * @returns {Promise<GetClaimCodeResponse>} Details of the indexed POAP.
   */
  async waitPoapIndexed(poapCode: string): Promise<GetClaimCodeResponse> {
    const checker = new PoapIndexed(poapCode, this.tokensApiProvider);
    return await checker.waitPoapIndexed();
  }

  /**
   * Begins an asynchronous claim process and provides a unique queue ID in return.
   * @async
   * @param {WalletClaimInput} input - Details required for the claim.
   * @returns {Promise<string>} A unique queue ID for the initiated claim.
   */
  async claimAsync(input: WalletClaimInput): Promise<string> {
    const secret = await this.getSecretCode(input.poapCode);

    const response = await this.tokensApiProvider.postClaimCode({
      address: input.address,
      qr_hash: input.poapCode,
      secret: secret,
      sendEmail: false,
    });

    return response.queue_uid;
  }

  /**
   * Starts a synchronous claim process. The method waits for the claim to be processed and then
   * fetches the associated POAP. It combines the asynchronous claim and subsequent status checking
   * into a synchronous process for ease of use.
   * @async
   * @param {WalletClaimInput} input - Details needed for the claim.
   * @returns {Promise<POAP>} The associated POAP upon successful claim completion.
   * @throws {FinishedWithError} If there's an error concluding the claim process.
   */
  async claimSync(input: WalletClaimInput): Promise<POAP> {
    const queueUid = await this.claimAsync(input);

    await this.waitClaimStatus(queueUid, input.poapCode);

    const getCodeResponse = await this.waitPoapIndexed(input.poapCode);

    return (
      await this.fetch({
        limit: 1,
        offset: 0,
        ids: [getCodeResponse.result.token],
      })
    ).items[0];
  }

  /**
   * Reserves a POAP against an email address and provides reservation details.
   * @async
   * @param {EmailClaimInput} input - Information for the reservation.
   * @returns {Promise<POAPReservation>} The reservation details of the POAP.
   */
  async emailReservation(input: EmailClaimInput): Promise<POAPReservation> {
    const secret = await this.getSecretCode(input.poapCode);

    const response = await this.tokensApiProvider.postClaimCode({
      address: input.email,
      qr_hash: input.poapCode,
      secret: secret,
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
