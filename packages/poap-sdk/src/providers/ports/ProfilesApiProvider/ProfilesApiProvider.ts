import { BulkProfilesResponse } from './types/BulkProfilesResponse';
import { ProfileResponse } from './types/ProfileResponse';

export interface ProfilesApiProvider {
  readonly apiUrl: string;
  getProfile(address: string): Promise<ProfileResponse | null>;
  getBulkProfiles(addresses: string[]): Promise<BulkProfilesResponse>;
}
