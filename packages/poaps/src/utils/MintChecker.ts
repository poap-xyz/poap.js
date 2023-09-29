import { MintingStatus } from '@poap-xyz/utils';
import { TokensApiProvider, MintStatusResponse } from '@poap-xyz/providers';
import { FinishedWithError } from '../errors/FinishedWithError';
import { RetryableTask } from './RetryableTask';

/**
 * A utility class designed to continually check the status of a POAP token mint.
 * If a mint is still pending or in process, it implements a backoff retry mechanism.
 */
export class MintChecker extends RetryableTask {
  private queueUid: string;
  private mintCode: string;

  /**
   * Constructs a new instance of the MintChecker class.
   *
   * @param {string} queueUid - The unique identifier for the token mint.
   * @param {string} mintCode - The unique code for the token mint.
   * @param {TokensApiProvider} tokensApiProvider - The provider to fetch the mint status.
   */
  constructor(
    queueUid: string,
    tokensApiProvider: TokensApiProvider,
    mintCode: string,
  ) {
    super(tokensApiProvider);
    this.queueUid = queueUid;
    this.mintCode = mintCode;
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
   * Handles any error statuses from the mint status response.
   * If the minting process finishes with an error, an exception will be thrown.
   *
   * @private
   * @param {MintStatusResponse} mintStatusResponse - The response from the mint status check.
   * @throws {FinishedWithError} Throws an error if the minting process finished with an error.
   */
  private handleErrorStatus(
    mintStatusResponse: MintStatusResponse,
    mintCode: string,
  ): void {
    if (
      mintStatusResponse.status === MintingStatus.FINISH_WITH_ERROR &&
      mintStatusResponse.result?.error
    ) {
      throw new FinishedWithError(mintStatusResponse.result?.error, mintCode);
    }
  }

  /**
   * Checks the current status of a token mint.
   * If the mint is still pending or in process, it will retry the check with an increased delay.
   *
   * @public
   * @returns {Promise<void>} A promise that resolves once the status has been checked.
   * @throws {FinishedWithError} Throws an error if the minting process finished with an error.
   */
  public async checkMintStatus(): Promise<void> {
    try {
      const mintStatusResponse = await this.tokensApiProvider.mintStatus(
        this.queueUid,
      );

      if (this.shouldRetry(mintStatusResponse.status)) {
        await this.backoffAndRetry(() => this.checkMintStatus());
      } else {
        this.handleErrorStatus(mintStatusResponse, this.mintCode);
      }
    } catch (e) {
      await this.backoffAndRetry(() => this.checkMintStatus());
    }
  }
}
