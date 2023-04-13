/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateMomentResponse } from './../../ports/MomentsApiProvider/Types/response';
import { CreateMomentInput } from './../../ports/MomentsApiProvider/Types/input';
import { MomentsApiProvider } from './../../ports/MomentsApiProvider/MomentsApiProvider';
import { HttpProvider } from './../../ports/HttpProvider/HttpProvider';

const MOMENTS_URL = 'https://registry.poap.tech';

export class PoapMomentsApi implements MomentsApiProvider {
  constructor(private apiKey: string, private HttpProvider: HttpProvider) {}

  async getFileUrl(): Promise<string> {
    return this.secureFetch(`${MOMENTS_URL}/file`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async createMoment(input: CreateMomentInput): Promise<CreateMomentResponse> {
    return await this.secureFetch(`${MOMENTS_URL}/moments`, {
      method: 'POST',
      body: JSON.stringify(input),
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
