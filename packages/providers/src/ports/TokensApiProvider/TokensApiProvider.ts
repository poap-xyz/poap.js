import {
  GetMintCodeResponse,
  PostMintCodeResponse,
  MintCodeInput,
  MintStatusResponse,
} from './Types';

/**
 * Provides methods for interacting with a Tokens API.
 *
 * @interface TokensApiProvider
 */
export interface TokensApiProvider {
  getMintCode(code: string): Promise<GetMintCodeResponse>;
  postMintCode(input: MintCodeInput): Promise<PostMintCodeResponse>;
  mintStatus(uid: string): Promise<MintStatusResponse>;
}
