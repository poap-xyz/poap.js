/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpProvider } from 'providers/src/ports/HttpProvider/HttpProvider';
import { RegistryApiProvider } from 'providers/src/ports/RegistryApiProvider/RegistryApiProvider';
import {
  CreateAttributeInput,
  CreateAttributeResponse,
  CreateAttributesBulkInput,
  CreateAttributesBulkResponse,
} from 'providers/src/ports/RegistryApiProvider/Types';

const METADATA_URL = 'https://registry.poap.tech';

export class PoapRegistryApi implements RegistryApiProvider {
  constructor(private apiKey: string, private HttpProvider: HttpProvider) {}

  async createAttribute(
    input: CreateAttributeInput,
  ): Promise<CreateAttributeResponse> {
    return await this.secureFetch(`${METADATA_URL}/attributes`, {
      method: 'POST',
      body: JSON.stringify(input.attribute),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async createAttributesBulk(
    input: CreateAttributesBulkInput,
  ): Promise<CreateAttributesBulkResponse> {
    return await this.secureFetch(`${METADATA_URL}/attributes/bulk`, {
      method: 'POST',
      body: JSON.stringify(input.attributes),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async secureFetch(url: string, options: any): Promise<any> {
    const headersWithApiKey = {
      ...options.headers,
      'x-api-key': this.apiKey,
    };

    return this.HttpProvider.request({
      endpoint: url,
      method: options.method,
      body: options.body,
      headers: headersWithApiKey,
    });
  }
}
