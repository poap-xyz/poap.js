import { Profile } from '../domain/Profile';
import { ProfileError } from '../domain/ProfileError';
import {
  ProfileResponse,
  ProfilesBulkError,
} from '../../providers/ports/ProfilesApiProvider/types';

export class ProfilesMapper {
  static createProfilesMap(
    profiles: ProfileResponse[],
    apiUrl: string,
  ): Map<string, Profile> {
    const profilesMap = new Map<string, Profile>();
    const processedAddresses = new Set<string>();
    for (const response of profiles) {
      this.addProfileToMap(response, profilesMap, processedAddresses, apiUrl);
    }
    return profilesMap;
  }

  private static addProfileToMap(
    response: ProfileResponse,
    profilesMap: Map<string, Profile>,
    processedAddresses: Set<string>,
    apiUrl: string,
  ): void {
    if (processedAddresses.has(response.address)) {
      return;
    }

    const profile = Profile.fromResponse(response, apiUrl);
    processedAddresses.add(response.address);
    profilesMap.set(profile.address, profile);
    if (profile.ens) {
      profilesMap.set(profile.ens, profile);
    }
  }

  static createErrorsMap(
    errors: ProfilesBulkError[],
  ): Map<string, ProfileError> {
    const errorsMap = new Map<string, ProfileError>();
    for (const error of errors) {
      errorsMap.set(error.id, { message: error.message });
    }
    return errorsMap;
  }
}
