import { ProfilesBulkError } from './ProfilesBulkError';
import { ProfileResponse } from './ProfileResponse';

export interface BulkProfilesResponse {
  profiles: ProfileResponse[];
  errors?: ProfilesBulkError[];
}
