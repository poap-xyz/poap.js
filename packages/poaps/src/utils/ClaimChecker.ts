import { MintingStatus } from '@poap-xyz/utils';
import { TokensApiProvider, ClaimStatusResponse } from '@poap-xyz/providers';
import { FinishedWithError } from '../errors/FinishedWithError';

const MAX_RETRIES = 20;
const INITIAL_DELAY = 1000;
const BACKOFF_FACTOR = 1.2;

/**
 * A utility class designed to continually check the status of a Poap token claim.
 * If a claim is still pending or in process, it implements a backoff retry mechanism.
 */
export class ClaimChecker {
  private retries = 0;
  private delay: number = INITIAL_DELAY;
  private queue_uid: string;
  private tokensApiProvider: TokensApiProvider;

  /**
   * Initializes a new instance of the `ClaimChecker` class.
   *
   * @param {string} queue_uid - The unique identifier for the token claim.
   * @param {TokensApiProvider} tokensApiProvider - The provider to fetch the claim status.
   */
  constructor(queue_uid: string, tokensApiProvider: TokensApiProvider) {
    this.queue_uid = queue_uid;
    this.tokensApiProvider = tokensApiProvider;
  }

  /**
   * Delays the callback function based on a delay that increases after each retry.
   *
   * @private
   * @param {() => Promise<void>} callback - The callback function to retry.
   */
  private backoffAndRetry(callback: () => Promise<void>): void {
    if (this.retries >= MAX_RETRIES) {
      throw new Error('Max retries reached');
    }
    this.retries++;
    this.delay *= BACKOFF_FACTOR;
    setTimeout(() => {
      callback().catch(() => {
        // Retry on error
      });
    }, this.delay); // Wrap the callback invocation
  }

  /**
   * Determines if a retry should occur based on the minting status.
   *
   * @private
   * @param {MintingStatus} status - The current minting status.
   * @returns {boolean} `true` if should retry, otherwise `false`.
   */
  private shouldRetry(status: MintingStatus): boolean {
    return (
      status === MintingStatus.IN_PROCESS || status === MintingStatus.PENDING
    );
  }

  /**
   * Handles errors from the claim status response.
   * Throws an error if the minting process finished with an error.
   *
   * @private
   * @param {ClaimStatusResponse} claimStatusResponse - The response from the claim status check.
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
   * Retries the check with an increased delay if the claim is still pending or in process.
   *
   * @public
   * @returns {Promise<void>} A promise that resolves once the status has been checked.
   */
  public async checkClaimStatus(): Promise<void> {
    try {
      const claimStatusResponse = await this.tokensApiProvider.claimStatus(
        this.queue_uid,
      );

      if (this.shouldRetry(claimStatusResponse.status)) {
        this.backoffAndRetry(() => this.checkClaimStatus());
      } else {
        this.handleErrorStatus(claimStatusResponse);
      }
    } catch (e) {
      this.backoffAndRetry(() => this.checkClaimStatus());
    }
  }
}
