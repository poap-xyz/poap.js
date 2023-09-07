import { TokensApiProvider, GetClaimCodeResponse } from '@poap-xyz/providers';

const MAX_RETRIES = 20;
const INITIAL_DELAY = 1000;
const BACKOFF_FACTOR = 1.2;

export class PoapIndexed {
  private retries = 0;
  private delay: number = INITIAL_DELAY;
  private qr_hash: string;
  private tokensApiProvider: TokensApiProvider;

  constructor(qr_hash: string, tokensApiProvider: TokensApiProvider) {
    this.qr_hash = qr_hash;
    this.tokensApiProvider = tokensApiProvider;
  }

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
