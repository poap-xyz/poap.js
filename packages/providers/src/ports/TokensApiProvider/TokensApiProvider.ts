import {
  GetClaimCodeResponse,
  PostClaimCodeResponse,
  ClaimCodeInput,
  ClaimStatusResponse,
} from './Types';

/**
 * Provides methods for interacting with a Tokens API.
 *
 * @interface TokensApiProvider
 */
export interface TokensApiProvider {
  getClaimCode(code: string): Promise<GetClaimCodeResponse>;
  postClaimCode(input: ClaimCodeInput): Promise<PostClaimCodeResponse>;
  claimStatus(uid: string): Promise<ClaimStatusResponse>;
}
