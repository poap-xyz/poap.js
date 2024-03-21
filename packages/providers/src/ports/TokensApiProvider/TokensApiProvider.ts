import {
  GetMintCodeResponse,
  MintCodeInput,
  PostMintCodeResponse,
  Transaction,
} from './types';

/**
 * Provides methods for interacting with a Tokens API.
 *
 * @interface TokensApiProvider
 */
export interface TokensApiProvider {
  getMintCode(code: string): Promise<GetMintCodeResponse>;

  postMintCode(input: MintCodeInput): Promise<PostMintCodeResponse>;

  getMintTransaction(qrHash: string): Promise<Transaction | null>;
}
