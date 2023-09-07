import {
  CompassProvider,
  TokensApiProvider,
  GetClaimCodeResponse,
} from '@poap-xyz/providers';
import { POAP } from './domain/Poap';
import { POAPReservation } from './domain/POAPReservation';
import { PaginatedPoapsResponse, PAGINATED_POAPS_QUERY } from './queries';
import { FetchPoapsInput, EmailClaimtInput, WalletClaimtInput } from './types';
import {
  PaginatedResult,
  nextCursor,
  createBetweenFilter,
  creatEqFilter,
  createInFilter,
  creatUndefinedOrder,
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
      collector_address,
      minted_date_from,
      minted_date_to,
      ids,
      drop_id,
      sort_field,
      sort_dir,
      filter_by_zero_address = true,
    } = input;

    const variables = {
      limit,
      offset,
      orderBy: creatUndefinedOrder(sort_field, sort_dir),
      where: {
        ...creatAddressFilter(
          'collector_address',
          filter_by_zero_address,
          collector_address,
        ),
        ...creatEqFilter('chain', chain),
        ...creatEqFilter('drop_id', drop_id),
        ...createBetweenFilter('minted_on', minted_date_from, minted_date_to),
        ...createInFilter('id', ids),
      },
    };

    const { data } = await this.compassProvider.request<PaginatedPoapsResponse>(
      PAGINATED_POAPS_QUERY,
      variables,
    );
    const poaps = data.poaps.map((poap) => {
      const { drop } = poap;
      const minted_on = new Date(0);
      minted_on.setUTCSeconds(poap.minted_on);
      return new POAP({
        ...poap,
        ...drop,
        id: Number(poap.id),
        minted_on,
        drop_id: Number(poap.drop_id),
        start_date: new Date(drop.start_date),
        end_date: new Date(drop.end_date),
      });
    });

    return new PaginatedResult<POAP>(
      poaps,
      nextCursor(poaps.length, limit, offset),
    );
  }

  /**
   * Retrieves the secret code associated with a QR hash.
   * @async
   * @param {string} qr_hash - The QR hash for which to get the secret.
   * @returns {Promise<string>} The associated secret code.
   * @throws {CodeAlreadyClaimedError} Thrown when the QR code has already been claimed.
   * @throws {CodeExpiredError} Thrown when the QR code is expired.
   */
  private async getCodeSecret(qr_hash: string): Promise<string> {
    const getCodeResponse = await this.getClaimCode(qr_hash);

    if (getCodeResponse.claimed == true) {
      throw new CodeAlreadyClaimedError(qr_hash);
    }
    if (getCodeResponse.is_active == false) {
      throw new CodeExpiredError(qr_hash);
    }

    return getCodeResponse.secret;
  }

  /**
   * Retrieves claim code details for a specific QR hash.
   * @async
   * @param {string} qr_hash - The QR hash for which to get the claim code.
   * @returns {Promise<GetClaimCodeResponse>} The claim code details.
   */
  async getClaimCode(qr_hash: string): Promise<GetClaimCodeResponse> {
    return await this.tokensApiProvider.getClaimCode(qr_hash);
  }

  /**
   * Fetches the current status of a claim based on its unique ID.
   * @async
   * @param {string} queue_uid - The unique ID of the claim.
   * @returns {Promise<MintingStatus>} The current status of the claim.
   */
  async getClaimStatus(queue_uid: string): Promise<MintingStatus> {
    const claimStatusResponse = await this.tokensApiProvider.claimStatus(
      queue_uid,
    );
    return claimStatusResponse.status;
  }

  /**
   * Awaits until the claim's status changes from 'IN_PROCESS' or 'PENDING'.
   * @async
   * @param {string} queue_uid - The unique ID of the claim.
   * @returns {Promise<void>}
   */
  async waitClaimStatus(queue_uid: string): Promise<void> {
    const checker = new ClaimChecker(queue_uid, this.tokensApiProvider);
    await checker.checkClaimStatus();
  }

  /**
   * Awaits until a specific POAP, identified by its QR hash, is indexed.
   * @async
   * @param {string} qr_hash - The QR hash identifying the POAP to be indexed.
   * @returns {Promise<GetClaimCodeResponse>} Details of the indexed POAP.
   */
  async waitPoapIndexed(qr_hash: string): Promise<GetClaimCodeResponse> {
    const checker = new PoapIndexed(qr_hash, this.tokensApiProvider);
    return await checker.waitPoapIndexed();
  }

  /**
   * Begins an asynchronous claim process and provides a unique queue ID in return.
   * @async
   * @param {WalletClaimtInput} input - Details required for the claim.
   * @returns {Promise<string>} A unique queue ID for the initiated claim.
   */
  async claimAsync(input: WalletClaimtInput): Promise<string> {
    const secret = await this.getCodeSecret(input.qr_hash);

    const response = await this.tokensApiProvider.postClaimCode({
      address: input.address,
      qr_hash: input.qr_hash,
      secret: secret,
      sendEmail: false,
    });

    return response.queue_uid;
  }

  /**
   * Starts a synchronous claim process. The method waits for the claim to be processed and then
   * fetches the associated POAP.
   * @async
   * @param {WalletClaimtInput} input - Details needed for the claim.
   * @returns {Promise<POAP>} The related POAP upon successful claim completion.
   * @throws {FinishedWithError} If there's an error concluding the claim process.
   */
  async claimSync(input: WalletClaimtInput): Promise<POAP> {
    const queue_uid = await this.claimAsync(input);

    await this.waitClaimStatus(queue_uid);

    const getCodeResponse = await this.waitPoapIndexed(input.qr_hash);

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
   * @param {EmailClaimtInput} input - Information for the reservation.
   * @returns {Promise<POAPReservation>} The reservation details of the POAP.
   */
  async emailReservation(input: EmailClaimtInput): Promise<POAPReservation> {
    const secret = await this.getCodeSecret(input.qr_hash);

    const response = await this.tokensApiProvider.postClaimCode({
      address: input.email,
      qr_hash: input.qr_hash,
      secret: secret,
      sendEmail: input.sendEmail || true,
    });

    return new POAPReservation({
      email: input.email,
      drop_id: response.event.id,
      image_url: response.event.image_url,
      city: response.event.city,
      country: response.event.country,
      description: response.event.description,
      start_date: new Date(response.event.start_date),
      end_date: new Date(response.event.end_date),
      name: response.event.name,
    });
  }
}
