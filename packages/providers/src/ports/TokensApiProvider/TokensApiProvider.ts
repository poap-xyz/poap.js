import { CheckCodeResponse, ClaimCodeResponse, ClaimCodeInput } from './Types';

/**
 * Provides methods for interacting with a Tokens API.
 *
 * @interface TokensApiProvider
 */
export interface TokensApiProvider {
  checkCode(code: string): Promise<CheckCodeResponse>;
  claimCode(input: ClaimCodeInput): Promise<ClaimCodeResponse>;
}
