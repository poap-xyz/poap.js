import {
  CompassProvider,
  TokensApiProvider,
  GetClaimCodeResponse,
} from '@poap-xyz/providers';
import { POAP } from './domain/Poap';
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
  Status,
  sleep,
} from '@poap-xyz/utils';
import { CodeAlreadyClaimedError } from './errors/CodeAlreadyClaimedError';
import { CodeExpiredError } from './errors/CodeExpiredError';
import { FinishedWithError } from './errors/FinishedWithError';
import { POAPReservation } from './domain/POAPReservation';

/**
 * Represents a client for working with POAPs.
 *
 * @class PoapsClient
 */
export class PoapsClient {
  /**
   * Creates a new PoapsClient object.
   *
   * @constructor
   * @param {CompassProvider} compassProvider - The provider for the POAP compass API.
   */
  constructor(
    private compassProvider: CompassProvider,
    private tokensApiProvider: TokensApiProvider,
  ) {}

  /**
   * Fetches drops based on the specified input.
   *
   * @async
   * @method
   * @param {FetchPoapsInput} input - The input for fetching poaps.
   * @returns {Promise<PaginatedResult<POAP>>} A paginated result of poaps.
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
   * Gets the secret associated with a specific QR hash.
   * @param {string} qr_hash - The QR hash.
   * @returns {Promise<string>} The secret.
   * @throws {CodeAlreadyClaimedError} If the code is already claimed.
   * @throws {CodeExpiredError} If the code is expired.
   */
  async getCodeSecret(qr_hash: string): Promise<string> {
    const getCodeResponse = await this.tokensApiProvider.getClaimCode(qr_hash);

    if (getCodeResponse.claimed == true) {
      throw new CodeAlreadyClaimedError(qr_hash);
    }
    if (getCodeResponse.is_active == false) {
      throw new CodeExpiredError(qr_hash);
    }

    return getCodeResponse.secret;
  }

  /**
   * Retrieves the claim code information for a specific QR hash.
   * @param {string} qr_hash - The QR hash.
   * @returns {Promise<GetClaimCodeResponse>} The claim code response.
   */
  async getClaimCode(qr_hash: string): Promise<GetClaimCodeResponse> {
    return await this.tokensApiProvider.getClaimCode(qr_hash);
  }

  /**
   * Gets the status of a claim using its unique ID.
   * @param {string} queue_uid - The unique ID of the claim.
   * @returns {Promise<Status>} The status of the claim.
   */
  async getClaimStatus(queue_uid: string): Promise<Status> {
    const claimStatusResponse = await this.tokensApiProvider.claimStatus(
      queue_uid,
    );
    return claimStatusResponse.status;
  }

  /**
   * Waits for a claim's status to move out of the 'IN_PROCESS' or 'PENDING' states.
   * @param {string} queue_uid - The unique ID of the claim.
   * @returns {Promise<Status>} The final status of the claim.
   */
  async waitClaimStatus(queue_uid: string): Promise<Status> {
    let status: Status = Status.IN_PROCESS;
    while (status === Status.IN_PROCESS || status === Status.PENDING) {
      try {
        status = await this.getClaimStatus(queue_uid);
        await sleep(1000);
      } catch {
        // do nothing
      }
    }
    return status;
  }

  /**
   * Initiates an asynchronous claim process and returns a unique queue ID.
   * @param {WalletClaimtInput} input - The claim input details.
   * @returns {Promise<string>} The unique queue ID.
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
   * Initiates a synchronous claim process. It waits for the claim to process and
   * then returns the associated POAP.
   * @param {WalletClaimtInput} input - The claim input details.
   * @returns {Promise<POAP>} The associated POAP once the claim is complete.
   * @throws {FinishedWithError} If the claim finishes with an error.
   */
  async claimSync(input: WalletClaimtInput): Promise<POAP> {
    const queue_uid = await this.claimAsync(input);

    const status = await this.waitClaimStatus(queue_uid);

    if (status === Status.FINISH) {
      let getCodeResponse = await this.getClaimCode(input.qr_hash);

      while (getCodeResponse.result == null) {
        await sleep(1000);
        getCodeResponse = await this.getClaimCode(input.qr_hash);
      }
      return (
        await this.fetch({
          limit: 1,
          offset: 0,
          ids: [getCodeResponse.result.token],
        })
      ).items[0];
    }

    throw new FinishedWithError(input.qr_hash);
  }

  /**
   * Reserves a POAP for an email address. Returns details of the reservation.
   * @param {EmailClaimtInput} input - The reservation input details.
   * @returns {Promise<POAPReservation>} The details of the reserved POAP.
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
