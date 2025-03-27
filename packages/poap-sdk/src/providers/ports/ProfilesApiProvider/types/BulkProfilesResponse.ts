import { ProfileResponse } from './ProfileResponse';

export interface BulkProfilesResponse {
  profiles: ProfileResponse[];
  errors?: { param: string; message: string }[];
}
