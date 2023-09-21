import { TokensApiProvider } from '@poap-xyz/providers';
import { RetryableTask } from './RetryableTask';
import { PoapMintStatus } from '../types';

/**
 * @class PoapIndexed
 * @extends {RetryableTask}
 *
 * Represents a utility class designed to periodically check if a POAP (Proof of Attendance Protocol) token is indexed.
 * This class extends `RetryableTask` to utilize its backoff retry mechanism in case the token hasn't been indexed yet.
 */
export class PoapIndexed extends RetryableTask {
  private mintCode: string;

  /**
   * Creates an instance of the PoapIndexed class.
   *
   * @param {string} mintCode - A unique QR hash representing the token.
   * @param {TokensApiProvider} tokensApiProvider - An instance of the TokensApiProvider used to check the indexing status of the token.
   */
  constructor(mintCode: string, tokensApiProvider: TokensApiProvider) {
    super(tokensApiProvider);
    this.mintCode = mintCode;
  }

  /**
   * Periodically checks if the POAP token, represented by its QR hash, is indexed.
   * This method will continue retrying with an increasing delay until either the token is indexed or it reaches the maximum allowed retries.
   *
   * @returns {Promise<GetClaimCodeResponse>} A promise that either resolves with the indexed token's mint code response or rejects due to reaching the max retry limit.
   */
  public async waitPoapIndexed(): Promise<PoapMintStatus> {
    let response = await this.tokensApiProvider.getMintCode(this.mintCode);
    while (response.result == null) {
      response = await this.backoffAndRetry(() =>
        this.tokensApiProvider.getMintCode(this.mintCode),
      );
    }
    return {
      minted: response.claimed,
      isActive: response.is_active,
      secret: response.secret,
      poapId: response.result?.token,
    };
  }
}
