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
import axios, { AxiosInstance } from 'axios';

const DEFAULT_DROP_BASE_URL = 'https://api.poap.tech';
/**
 * Represents the main interface to interact with the Poap Drop API.
 *
 * @export
 * @class PoapTokenApi
 * @implements {TokensApiProvider}
 */
export class PoapTokenApi implements TokensApiProvider {
  private apiKey: string;
  private baseUrl: string;
  private authenticationProvider?: AuthenticationProvider;
  private poapApi: AxiosInstance;
  /**
   * Constructs a new instance of the `PoapTokenApi` class.
   *
   * @constructor
   * @param {PoapTokenApiOptions} options - Configuration options for the API.
   * @param {string} options.apiKey - The API key for authenticating requests.
   * @param {string} [options.baseUrl=DEFAULT_DROP_BASE_URL] - The base URL for the API.
   * @param {AuthenticationProvider} [options.authenticationProvider] - Optional provider for JWT authentication.
   */
  constructor({
    apiKey,
    baseUrl = DEFAULT_DROP_BASE_URL,
    authenticationProvider,
  }: PoapTokenApiOptions) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.authenticationProvider = authenticationProvider;
    this.poapApi = axios.create({
      timeout: 10000, // 10 seconds
    });
  }

  /**
   * Retrieves the claim code details.
   *
   * @param {string} code - The unique QR hash for the claim.
   * @returns {Promise<GetClaimCodeResponse>} Details of the claim code.
   */
  async getClaimCode(code: string): Promise<GetClaimCodeResponse> {
    return await this.secureFetch<GetClaimCodeResponse>(
      `${this.baseUrl}/actions/claim-qr?qr_hash=${code}`,
      {
        method: 'GET',
        headers: {},
      },
    );
  }

  /**
   * Posts a new claim code to the API.
   *
   * @param {ClaimCodeInput} input - The input data for the claim code.
   * @returns {Promise<PostClaimCodeResponse>} Response from the claim code creation.
   */
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

  /**
   * Checks the status of a claim by its unique identifier.
   *
   * @param {string} uid - The unique identifier for the claim.
   * @returns {Promise<ClaimStatusResponse>} Status details of the claim.
   */
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
   * Sends a secure HTTP request to the Poap Drop API with proper headers.
   *
   * @private
   * @template R - Type of the expected response data.
   * @param {string} url - The complete URL for the HTTP request.
   * @param {any} options - Configuration options for the HTTP request.
   * @returns {Promise<R>} A promise that resolves with the parsed API response.
   */
  private async secureFetch<R>(url: string, options: any): Promise<R> {
    const headersWithApiKey = {
      ...options.headers,
      'x-api-key': this.apiKey,
      Authorization: await this.getAuthorizationToken(),
    };

    return (
      await this.poapApi(url, {
        method: options.method,
        data: options.body,
        headers: headersWithApiKey,
      })
    ).data;
  }

  /**
   * Retrieves the authorization token for making authenticated requests.
   *
   * @private
   * @throws {MissingAuthenticationProviderError} If no authentication provider is provided.
   * @returns {Promise<string>} The bearer token for authentication.
   */
  private async getAuthorizationToken(): Promise<string> {
    if (!this.authenticationProvider) {
      throw new MissingAuthenticationProviderError();
    }
    return `Bearer ${await this.authenticationProvider.getJWT(this.baseUrl)}`;
  }
}

/**
 * Represents the configuration options required when instantiating the `PoapTokenApi` class.
 *
 * @export
 * @interface PoapTokenApiOptions
 * @property {string} apiKey - The API key to use for authenticating requests.
 * @property {string} [baseUrl] - The base URL for the API. Defaults to 'https://api.poap.tech'.
 * @property {AuthenticationProvider} [authenticationProvider] - Optional provider for JWT authentication.
 */
export interface PoapTokenApiOptions {
  apiKey: string;
  baseUrl?: string;
  authenticationProvider?: AuthenticationProvider;
}
