import { TokensApiProvider, GetClaimCodeResponse } from '@poap-xyz/providers';

const MAX_RETRIES = 20;
const INITIAL_DELAY = 1000;
const BACKOFF_FACTOR = 1.2;

/**
 * A utility class designed to periodically check if a POAP (Proof of Attendance Protocol) token is indexed.
 * It implements a backoff retry mechanism if the token hasn't been indexed yet.
 */
export class PoapIndexed {
  private retries = 0;
  private delay: number = INITIAL_DELAY;
  private qr_hash: string;
  private tokensApiProvider: TokensApiProvider;

  /**
   * Initializes a new instance of the `PoapIndexed` class.
   *
   * @param {string} qr_hash - The unique QR hash of the token.
   * @param {TokensApiProvider} tokensApiProvider - The provider to check if the token is indexed.
   */
  constructor(qr_hash: string, tokensApiProvider: TokensApiProvider) {
    this.qr_hash = qr_hash;
    this.tokensApiProvider = tokensApiProvider;
  }

  /**
   * Delays the callback function based on a delay that increases after each retry.
   *
   * @private
   * @param {() => Promise<GetClaimCodeResponse>} callback - The callback function to retry.
   * @returns {Promise<GetClaimCodeResponse>} The response of the callback function.
   */
  private async backoffAndRetry(
    callback: () => Promise<GetClaimCodeResponse>,
  ): Promise<GetClaimCodeResponse> {
    if (this.retries >= MAX_RETRIES) {
      throw new Error('Max retries reached');
    }
    this.retries++;
    this.delay *= BACKOFF_FACTOR;

    await new Promise((resolve) => setTimeout(resolve, this.delay));
    return callback();
  }

  /**
   * Continuously checks if a POAP token is indexed.
   * It will keep retrying based on a delay that increases each time until the token is indexed or max retries are reached.
   *
   * @public
   * @returns {Promise<GetClaimCodeResponse>} A promise that resolves with the indexed token's claim code response.
   */
  public async waitPoapIndexed(): Promise<GetClaimCodeResponse> {
    let response = await this.tokensApiProvider.getClaimCode(this.qr_hash);
    while (response.result == null) {
      response = await this.backoffAndRetry(() =>
        this.tokensApiProvider.getClaimCode(this.qr_hash),
      );
    }
    return response;
  }
}
