/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropApiProvider } from '../../ports/DropApiProvider/DropApiProvider';
import {
  CreateDropInput,
  DropResponse,
  UpdateDropInput,
} from '../../ports/DropApiProvider/Types';
import { HttpProvider } from '../../ports/HttpProvider/HttpProvider';

export class PoapDropApi implements DropApiProvider {
  private baseUrl = 'https://api.poap.tech';

  constructor(private apiKey: string, private HttpProvider: HttpProvider) {}

  async createDrop(input: CreateDropInput): Promise<DropResponse> {
    return await this.secureFetch(`${this.baseUrl}/events`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {},
    });
  }

  async updateDrop(input: UpdateDropInput): Promise<DropResponse> {
    return await this.secureFetch(`${this.baseUrl}/events`, {
      method: 'PUT',
      body: JSON.stringify(input),
      headers: {},
    });
  }

  // TODO: Change variable type any to a more specific type
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
