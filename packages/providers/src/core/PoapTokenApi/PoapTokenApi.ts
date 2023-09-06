/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PostClaimCodeResponse,
  ClaimStatusResponse,
  GetClaimCodeResponse,
} from './../../ports/TokensApiProvider/Types/response';
import { ClaimCodeInput } from './../../ports/TokensApiProvider/Types/input';
import { AuthenticationProvider } from './../../ports/AuthenticationProvider/AuthenticationProvider';
import { TokensApiProvider } from './../../ports/TokensApiProvider/TokensApiProvider';
import axios from 'axios';

const instance = axios.create({
  timeout: 10000, // 5 seconds
});

const DROP_BASE_URL = 'https://api.poap.tech';

export class PoapTokenApi implements TokensApiProvider {
  /**
   * Creates a new instance of the `PoapDropApi` class.
   *
   * @constructor
   * @param {string} apiKey - The API key to use for requests.
   * @param {HttpProvider} HttpProvider - An instance of the `HttpProvider` class for making HTTP requests.
   */
  constructor(
    private apiKey: string,
    private baseUrl: string = DROP_BASE_URL,
    private authenticationProvider?: AuthenticationProvider,
  ) {}

  async getClaimCode(code: string): Promise<GetClaimCodeResponse> {
    return await this.secureFetch(
      `${this.baseUrl}/actions/claim-qr?qr_hash=${code}`,
      {
        method: 'GET',
        headers: {},
      },
    );
  }

  async postClaimCode(input: ClaimCodeInput): Promise<PostClaimCodeResponse> {
    return await this.secureFetch(`${this.baseUrl}/actions/claim-qr`, {
      method: 'POST',
      body: input,
      headers: {},
    });
  }

  async claimStatus(uid: string): Promise<ClaimStatusResponse> {
    return await this.secureFetch(`${this.baseUrl}/queue-message/${uid}`, {
      method: 'GET',
      headers: {},
    });
  }
  // TODO: Change variable type any to a more specific type
  /**
   * Sends a secure HTTP request to the Poap Drop API.
   *
   * @async
   * @private
   * @function
   * @name PoapDropApi#secureFetch
   * @param {string} url - The URL for the HTTP request.
   * @param {any} options - The options for the HTTP request.
   * @returns {Promise<any>} A Promise that resolves with the response from the API.
   */
  private async secureFetch(url: string, options: any): Promise<any> {
    const headersWithApiKey = {
      ...options.headers,
      'x-api-key': this.apiKey,
      Authorization: await this.getAuthorizationToken(),
    };

    return (
      await instance(url, {
        method: options.method,
        data: options.body,
        headers: headersWithApiKey,
      })
    ).data;
  }

  private async getAuthorizationToken(): Promise<string> {
    if (!this.authenticationProvider) {
      throw new Error(
        'An AuthenticationProvider is required for write operations',
      );
    }

    return `Bearer ${await this.authenticationProvider.getJWT(this.baseUrl)}`;
  }
}
