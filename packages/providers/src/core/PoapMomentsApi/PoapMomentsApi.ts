/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateMomentResponse } from './../../ports/MomentsApiProvider/Types/response';
import { CreateMomentInput } from './../../ports/MomentsApiProvider/Types/input';
import { MomentsApiProvider } from './../../ports/MomentsApiProvider/MomentsApiProvider';
import axios from 'axios';

export class PoapMomentsApi implements MomentsApiProvider {
  constructor(
    private apiKey: string,
    private baseUrl: string = 'https://moments.poap.tech',
  ) {}

  async getSignedUrl(): Promise<{ url: string; key: string }> {
    return await this.secureFetch(`${this.baseUrl}/moments/media-upload-url`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async uploadFile(file: Buffer, signedUrl: string): Promise<void> {
    return await this.secureFetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': 'application/octet-stream', // This can be adjusted based on the actual file type
      },
    });
  }

  async waitForMediaProcessing(mediaKey: string): Promise<void> {
    let status = 'IN_PROCESS';
    await new Promise((resolve) => setTimeout(resolve, 2000));

    while (status !== 'PROCESSED') {
      try {
        const response = await this.secureFetch(
          `${this.baseUrl}/media/${mediaKey}`,
          {
            method: 'GET',
          },
        );
        status = response.status;
      } catch (error) {
        console.log('Error while getting media: ', error);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  async createMoment(input: CreateMomentInput): Promise<CreateMomentResponse> {
    return await this.secureFetch(`${this.baseUrl}/moments`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async secureFetch(url: string, options: any): Promise<any> {
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
