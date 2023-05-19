/**
 * Authentication provider port
 *
 * @Interface AuthenticationProvider
 */
export interface AuthenticationProvider {
  /**
   * Get a JWT from the authentication provider
   * @param audience The audience of the JWT
   */
  getJWT(audience: string): Promise<string>;
}
