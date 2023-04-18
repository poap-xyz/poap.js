/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegistryApiProvider } from '../../ports/RegistryApiProvider/RegistryApiProvider';
import {
  CreateAttributeInput,
  CreateAttributeResponse,
  CreateAttributesBulkInput,
  CreateAttributesBulkResponse,
} from '../../ports/RegistryApiProvider/Types';
import axios from 'axios';

/**
 * Creates a new instance of the `PoapRegistryApi` class.
 *
 * @constructor
 * @param {string} apiKey - The API key to use for requests.
 * @param {HttpProvider} HttpProvider - An instance of the `HttpProvider` class for making HTTP requests.
 */
export class PoapRegistryApi implements RegistryApiProvider {
  constructor(
    private apiKey: string,
    private baseUrl: string = 'https://registry.poap.tech',
  ) {}

  /**
   * Creates a new attribute on the Poap Registry API.
   *
   * @async
   * @function
   * @name PoapRegistryApi#createAttribute
   * @param {CreateAttributeInput} input - The input data for creating the attribute.
   * @returns {Promise<CreateAttributeResponse>} A Promise that resolves with the response from the API.
   */
  async createAttribute(
    input: CreateAttributeInput,
  ): Promise<CreateAttributeResponse> {
    return await this.secureFetch(`${this.baseUrl}/attributes`, {
      method: 'POST',
      body: JSON.stringify(input.attribute),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Creates multiple attributes at once on the Poap Registry API.
   *
   * @async
   * @function
   * @name PoapRegistryApi#createAttributesBulk
   * @param {CreateAttributesBulkInput} input - The input data for creating the attributes.
   * @returns {Promise<CreateAttributesBulkResponse>} A Promise that resolves with the response from the API.
   */
  async createAttributesBulk(
    input: CreateAttributesBulkInput,
  ): Promise<CreateAttributesBulkResponse> {
    return await this.secureFetch(`${this.baseUrl}/attributes/bulk`, {
      method: 'POST',
      body: JSON.stringify(input.attributes),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Sends a secure HTTP request to the Poap Registry API.
   *
   * @async
   * @private
   * @function
   * @name PoapRegistryApi#secureFetch
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
      await axios(url, {
        method: options.method,
        data: options.body,
        headers: headersWithApiKey,
      })
    ).data;
  }
}
