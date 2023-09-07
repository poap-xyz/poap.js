import { MintingStatus } from '@poap-xyz/utils';
import { TokensApiProvider, ClaimStatusResponse } from '@poap-xyz/providers';
import { FinishedWithError } from '../errors/FinishedWithError';

const MAX_RETRIES = 20;
const INITIAL_DELAY = 1000;
const BACKOFF_FACTOR = 1.2;

export class ClaimChecker {
  private retries = 0;
  private delay: number = INITIAL_DELAY;
  private queue_uid: string;
  private tokensApiProvider: TokensApiProvider;

  constructor(queue_uid: string, tokensApiProvider: TokensApiProvider) {
    this.queue_uid = queue_uid;
    this.tokensApiProvider = tokensApiProvider;
  }

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

  private shouldRetry(status: MintingStatus): boolean {
    return (
      status === MintingStatus.IN_PROCESS || status === MintingStatus.PENDING
    );
  }

  private handleErrorStatus(claimStatusResponse: ClaimStatusResponse): void {
    if (
      claimStatusResponse.status === MintingStatus.FINISH_WITH_ERROR &&
      claimStatusResponse.result?.error
    ) {
      throw new FinishedWithError(claimStatusResponse.result?.error);
    }
  }

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
