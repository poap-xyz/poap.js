/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProvider } from './ApiProvider';
export class ApiService {
  constructor(private apiKey: string, private ApiProvider: ApiProvider) {}

  async fetchGraphQL(query: string, variables: any = {}): Promise<any> {
    const endpoint = 'https://explorer.poap.tech/v1/graphql';

    try {
      const response = await this.ApiProvider.request({
        method: 'POST',
        endpoint,
        body: {
          query,
          variables,
        },
        headers: {
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey ? { 'x-api-key': this.apiKey } : {}),
          },
        },
      });

      const json = response.data;

      if (json.errors) {
        throw new Error(
          `Error fetching GraphQL data: ${JSON.stringify(json.errors)}`,
        );
      }

      return json.data;
    } catch (error) {
      throw new Error(
        `Network error, received status code ${error.response.status}`,
      );
    }
  }

  async request<T>(query: string, variables: any): Promise<T> {
    try {
      const data = await this.fetchGraphQL(query, variables);
      return data as T;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
