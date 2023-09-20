import { TokensApiProvider } from '@poap-xyz/providers';
import { RetryableTask } from './RetryableTask';
import { GetMintCodeResponse } from '../types';

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
  public async waitPoapIndexed(): Promise<GetMintCodeResponse> {
    let response = await this.tokensApiProvider.getMintCode(this.mintCode);
    while (response.result == null) {
      response = await this.backoffAndRetry(() =>
        this.tokensApiProvider.getMintCode(this.mintCode),
      );
    }
    return {
      id: response.id,
      qrHash: response.qr_hash,
      txHash: response.tx_hash,
      eventId: response.event_id,
      beneficiary: response.beneficiary,
      userInput: response.user_input,
      signer: response.signer,
      claimed: response.claimed,
      claimedDate: response.claimed_date,
      createdDate: response.created_date,
      isActive: response.is_active,
      secret: response.secret,
      txStatus: response.tx_status,
      result: {
        token: response.result?.token,
      },
    };
  }
}
