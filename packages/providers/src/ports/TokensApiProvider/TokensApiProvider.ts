import {
  GetMintCodeResponseRaw,
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
  getMintCode(code: string): Promise<GetMintCodeResponseRaw>;
  postMintCode(input: MintCodeInput): Promise<PostMintCodeResponse>;
  mintStatus(uid: string): Promise<MintStatusResponse>;
}
