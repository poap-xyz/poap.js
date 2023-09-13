/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingAuthenticationProviderError } from './../../ports/AuthenticationProvider/errors/MissingAuthenticationProviderError';
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
  timeout: 10000, // 10 seconds
});

const DEFAULT_DROP_BASE_URL = 'https://api.poap.tech';

export class PoapTokenApi implements TokensApiProvider {
  private apiKey: string;
  private baseUrl: string;
  private authenticationProvider?: AuthenticationProvider;
  /**
   * Creates a new instance of the `PoapDropApi` class.
   *
   * @constructor
   * @param {string} apiKey - The API key to use for requests.
   */
  constructor({
    apiKey,
    baseUrl = DEFAULT_DROP_BASE_URL,
    authenticationProvider,
  }: PoapTokenApiOptions) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.authenticationProvider = authenticationProvider;
  }

  async getClaimCode(code: string): Promise<GetClaimCodeResponse> {
    return await this.secureFetch<GetClaimCodeResponse>(
      `${this.baseUrl}/actions/claim-qr?qr_hash=${code}`,
      {
        method: 'GET',
        headers: {},
      },
    );
  }

  async postClaimCode(input: ClaimCodeInput): Promise<PostClaimCodeResponse> {
    return await this.secureFetch<PostClaimCodeResponse>(
      `${this.baseUrl}/actions/claim-qr`,
      {
        method: 'POST',
        body: input,
        headers: {},
      },
    );
  }

  async claimStatus(uid: string): Promise<ClaimStatusResponse> {
    return await this.secureFetch<ClaimStatusResponse>(
      `${this.baseUrl}/queue-message/${uid}`,
      {
        method: 'GET',
        headers: {},
      },
    );
  }

  /**
   * Sends a secure HTTP request to the Poap Drop API.
   *
   * @async
   * @private
   * @function
   * @name PoapDropApi#secureFetch
   * @param {string} url - The URL for the HTTP request.
   * @param {any} options - The options for the HTTP request.
   * @returns {Promise<R>} A Promise that resolves with the response from the API.
   */
  private async secureFetch<R>(url: string, options: any): Promise<R> {
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
      throw new MissingAuthenticationProviderError();
    }
    return `Bearer ${await this.authenticationProvider.getJWT(this.baseUrl)}`;
  }
}

export interface PoapTokenApiOptions {
  apiKey: string;
  baseUrl?: string;
  authenticationProvider?: AuthenticationProvider;
}
