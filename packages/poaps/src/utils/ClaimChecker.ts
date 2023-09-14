import { MintingStatus } from '@poap-xyz/utils';
import { TokensApiProvider, ClaimStatusResponse } from '@poap-xyz/providers';
import { FinishedWithError } from '../errors/FinishedWithError';
import { RetryableTask } from './RetryableTask';

/**
 * A utility class designed to continually check the status of a Poap token claim.
 * If a claim is still pending or in process, it implements a backoff retry mechanism.
 */
export class ClaimChecker extends RetryableTask {
  private queue_uid: string;

  /**
   * Constructs a new instance of the ClaimChecker class.
   *
   * @param {string} queue_uid - The unique identifier for the token claim.
   * @param {TokensApiProvider} tokensApiProvider - The provider to fetch the claim status.
   */
  constructor(queue_uid: string, tokensApiProvider: TokensApiProvider) {
    super(tokensApiProvider);
    this.queue_uid = queue_uid;
  }

  /**
   * Determines if a retry should be performed based on the provided minting status.
   *
   * @private
   * @param {MintingStatus} status - The current minting status.
   * @returns {boolean} Returns true if a retry should be performed, otherwise false.
   */
  private shouldRetry(status: MintingStatus): boolean {
    return (
      status === MintingStatus.IN_PROCESS || status === MintingStatus.PENDING
    );
  }

  /**
   * Handles any error statuses from the claim status response.
   * If the minting process finishes with an error, an exception will be thrown.
   *
   * @private
   * @param {ClaimStatusResponse} claimStatusResponse - The response from the claim status check.
   * @throws {FinishedWithError} Throws an error if the minting process finished with an error.
   */
  private handleErrorStatus(claimStatusResponse: ClaimStatusResponse): void {
    if (
      claimStatusResponse.status === MintingStatus.FINISH_WITH_ERROR &&
      claimStatusResponse.result?.error
    ) {
      throw new FinishedWithError(claimStatusResponse.result?.error);
    }
  }

  /**
   * Checks the current status of a token claim.
   * If the claim is still pending or in process, it will retry the check with an increased delay.
   *
   * @public
   * @returns {Promise<void>} A promise that resolves once the status has been checked.
   * @throws {FinishedWithError} Throws an error if the minting process finished with an error.
   */
  public async checkClaimStatus(): Promise<void> {
    try {
      const claimStatusResponse = await this.tokensApiProvider.claimStatus(
        this.queue_uid,
      );

      if (this.shouldRetry(claimStatusResponse.status)) {
        await this.backoffAndRetry(() => this.checkClaimStatus());
      } else {
        this.handleErrorStatus(claimStatusResponse);
      }
    } catch (e) {
      await this.backoffAndRetry(() => this.checkClaimStatus());
    }
  }
}
