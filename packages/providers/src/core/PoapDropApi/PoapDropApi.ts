/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropApiProvider } from '../../ports/DropApiProvider/DropApiProvider';
import {
  CreateDropInput,
  DropResponse,
  UpdateDropInput,
} from '../../ports/DropApiProvider/Types';
import FormData from 'form-data';
import axios, { AxiosInstance } from 'axios';

const DEFAULT_DROP_BASE_URL = 'https://api.poap.tech';

/**
 * A class that implements the `DropApiProvider` interface for interacting with the POAP Drop API.
 *
 * @class
 * @implements {DropApiProvider}
 */
export class PoapDropApi implements DropApiProvider {
  private apiKey: string;
  private baseUrl: string;
  private poapApi: AxiosInstance;

  /**
   * Creates a new instance of the `PoapDropApi` class.
   *
   * @constructor
   * @param {PoapDropApiConfig} config - Configuration object containing the API key and optional base URL.
   */
  constructor(config: PoapDropApiConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || DEFAULT_DROP_BASE_URL;
    this.poapApi = axios.create({
      timeout: 10000, // 10 seconds
    });
  }

  /**
   * Creates a new drop on the POAP Drop API.
   *
   * @async
   * @function
   * @name PoapDropApi#createDrop
   * @param {CreateDropInput} input - The input data for creating the drop.
   * @returns {Promise<DropResponse>} A Promise that resolves with the response from the API.
   */
  async createDrop(input: CreateDropInput): Promise<DropResponse> {
    const form = new FormData();
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        if (key === 'image') {
          form.append(key, input[key], {
            filename: input['filename'],
            contentType: input['contentType'],
          });
        } else {
          form.append(key, (input[key] as string) + '');
        }
      }
    }
    return await this.secureFetch(`${this.baseUrl}/events`, {
      method: 'POST',
      body: form,
      headers: {
        ...form.getHeaders(),
      },
    });
  }

  /**
   * Updates an existing drop on the POAP Drop API.
   *
   * @async
   * @function
   * @name PoapDropApi#updateDrop
   * @param {UpdateDropInput} input - The input data for updating the drop.
   * @returns {Promise<DropResponse>} A Promise that resolves with the response from the API.
   */
  async updateDrop(input: UpdateDropInput): Promise<DropResponse> {
    return await this.secureFetch(`${this.baseUrl}/events`, {
      method: 'PUT',
      body: JSON.stringify(input),
      headers: {},
    });
  }

  // TODO: Change variable type any to a more specific type
  /**
   * Sends a secure HTTP request to the POAP Drop API.
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
    };

    return (
      await this.poapApi(url, {
        method: options.method,
        data: options.body,
        headers: headersWithApiKey,
      })
    ).data;
  }
}

/**
 * Configuration interface for the PoapDropApi class.
 *
 * @interface
 * @property {string} apiKey - The API key to use for requests.
 * @property {string} [baseUrl] - Optional base URL to override the default one.
 */
export interface PoapDropApiConfig {
  apiKey: string;
  baseUrl?: string;
}
