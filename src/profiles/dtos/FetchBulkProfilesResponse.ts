import { Profile } from '../domain/Profile';
import { ProfileError } from '../domain/ProfileError';

export interface FetchBulkProfilesResponse {
  profiles: Map<string, Profile>;
  errors: Map<string, ProfileError>;
}
