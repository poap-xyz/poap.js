import { AuthenticationProvider } from '../../ports';
import axios from 'axios';

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

    const response = await axios.post(
      `https://${this.oAuthServerDomain}/oauth/token`,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience,
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    this.tokenData = {
      accessToken: response.data.access_token,
      expiresAt: Date.now() + response.data.expires_in * 1000,
    };

    return response.data.access_token;
  }

  private isTokenExpired(): boolean {
    return !this.tokenData || this.tokenData.expiresAt < Date.now();
  }
}
