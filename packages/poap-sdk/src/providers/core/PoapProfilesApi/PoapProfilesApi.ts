import {
  ProfilesApiProvider,
  ProfileResponse,
} from '../../ports/ProfilesApiProvider/';
import { BulkProfilesResponse } from '../../ports/ProfilesApiProvider/types/BulkProfilesResponse';

const DEFAULT_PROFILES_API_URL = 'https://profiles.poap.tech';

export class PoapProfilesApi implements ProfilesApiProvider {
  readonly apiUrl: string;

  constructor(params: { apiUrl?: string }) {
    this.apiUrl = params.apiUrl ?? DEFAULT_PROFILES_API_URL;
  }

  async getProfile(address: string): Promise<ProfileResponse | null> {
    try {
      return await this.request<ProfileResponse>(`/profile/${address}`);
    } catch {
      return null;
    }
  }

  async getBulkProfiles(addresses: string[]): Promise<BulkProfilesResponse> {
    if (addresses.length === 0) {
      return { profiles: [] };
    }

    if (addresses.length === 1) {
      const profile = await this.getProfile(addresses[0]);
      return { profiles: profile ? [profile] : [] };
    }

    return await this.request<BulkProfilesResponse>(
      `/bulk/profile/${addresses.join(',')}`,
    );
  }

  private async request<T>(path: string): Promise<T> {
    const response = await fetch(`${this.apiUrl}${path}`);
    return await response.json();
  }
}
