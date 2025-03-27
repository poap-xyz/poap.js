import chunk from 'lodash.chunk';
import { BulkProfilesResponse } from '../../ports/ProfilesApiProvider/types/BulkProfilesResponse';
import { ProfileResponse } from '../../ports/ProfilesApiProvider/types/ProfileResponse';
import { ProfilesApiProvider } from '../../ports/ProfilesApiProvider/';

const DEFAULT_PROFILES_API_URL = 'https://profiles.poap.tech';
const REQUEST_PARAM_COUNT_LIMIT = 100;
const BATCH_REQUEST_SIZE = 5;

export class PoapProfilesApi implements ProfilesApiProvider {
  readonly apiUrl: string;

  constructor(params: { apiUrl?: string }) {
    this.apiUrl = params.apiUrl ?? DEFAULT_PROFILES_API_URL;
  }

  /**
   * Get a profile by address or ENS.
   * @param query ETH address or ENS
   * @returns The response from the API.
   */
  async getProfile(query: string): Promise<ProfileResponse | null> {
    try {
      return await this.request<ProfileResponse>(
        `/profile/${encodeURIComponent(query)}`,
      );
    } catch {
      return null;
    }
  }

  /**
   * Get a list of profiles by ETH address or ENS. Will make multiple requests if
   * the list is too big.
   * @param queries ETH addresses or ENS
   * @returns The list of responses from the API.
   */
  async getBulkProfiles(queries: string[]): Promise<ProfileResponse[]> {
    if (queries.length === 0) {
      return [];
    }

    if (queries.length === 1) {
      const profile = await this.getProfile(queries[0]);
      return profile ? [profile] : [];
    }

    const batchResult = await this.batchBulkProfilesRequest(queries);
    return batchResult.reduce(
      (profiles, response) => profiles.concat(response.profiles),
      [] as ProfileResponse[],
    );
  }

  private async batchBulkProfilesRequest(
    queries: string[],
  ): Promise<BulkProfilesResponse[]> {
    const results: BulkProfilesResponse[] = [];
    const requests = chunk(queries, REQUEST_PARAM_COUNT_LIMIT);
    const chunks = chunk(requests, BATCH_REQUEST_SIZE);

    for (const chunk of chunks) {
      const responses = await Promise.allSettled(
        chunk.map((queries) =>
          this.request<BulkProfilesResponse>(
            `/bulk/profile/${queries.map((query) => encodeURIComponent(query)).join(',')}`,
          ),
        ),
      );
      const successResponses = responses.reduce<BulkProfilesResponse[]>(
        (acc, response) =>
          response.status === 'fulfilled' ? [...acc, response.value] : acc,
        [],
      );
      results.push(...successResponses);
    }

    return results;
  }

  private async request<T>(path: string): Promise<T> {
    const response = await fetch(`${this.apiUrl}${path}`);
    if (!response.ok) {
      await this.handleError(response);
    }
    return await response.json();
  }

  private async handleError(response: Response): Promise<never> {
    try {
      const body = await response.json();
      throw new Error(
        `Failed to fetch ${response.url} | ${body?.message || 'Unexpected error'}`,
      );
    } catch {
      throw new Error(`Failed to fetch ${response.url} | Unexpected error`);
    }
  }
}
