import { AuthenticationProvider } from '../../ports/AuthenticationProvider/AuthenticationProvider';

const DEFAULT_OAUTH_SERVER = 'auth.accounts.poap.xyz';

export class AuthenticationProviderHttp implements AuthenticationProvider {
  private readonly oAuthServerDomain: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private tokenData?: { accessToken: string; expiresAt: number };

  constructor(
    clientId: string,
    clientSecret: string,
    oAuthServerDomain?: string,
  ) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.oAuthServerDomain = oAuthServerDomain || DEFAULT_OAUTH_SERVER;
  }

  public async getJWT(audience: string): Promise<string> {
    if (this.tokenData && !this.isTokenExpired()) {
      return this.tokenData.accessToken;
    }

    const response = await fetch(
      `https://${this.oAuthServerDomain}/oauth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          audience,
          grant_type: 'client_credentials',
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const responseData = await response.json();

    this.tokenData = {
      accessToken: responseData.access_token,
      expiresAt: Date.now() + responseData.expires_in * 1000,
    };

    return responseData.access_token;
  }

  private isTokenExpired(): boolean {
    return !this.tokenData || this.tokenData.expiresAt < Date.now();
  }
}
