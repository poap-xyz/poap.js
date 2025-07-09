import { ProfilesApiProvider } from '../providers';
import { Profile } from './domain/Profile';
import { FetchBulkProfilesResponse } from './dtos/FetchBulkProfilesResponse';
import { ProfileError } from './domain/ProfileError';
import { ProfileResponse } from '../providers/ports/ProfilesApiProvider/types/ProfileResponse';
import { ProfilesBulkError } from '../providers/ports/ProfilesApiProvider/types/ProfilesBulkError';

export class ProfilesClient {
  /**
   * @constructor
   * @param profileApiProvider The provider for the POAP profile API.
   */
  constructor(private profileApiProvider: ProfilesApiProvider) {}

  /**
   * @param query The ETH address or ENS.
   * @param options Options to pass to the fetch call.
   * @returns The profile, or null if not found.
   */
  async fetch(query: string, options?: RequestInit): Promise<Profile | null> {
    const response = await this.profileApiProvider.getProfile(query, options);
    if (!response) {
      return null;
    }
    return Profile.fromResponse(response, this.profileApiProvider.apiUrl);
  }

  /**
   * Fetch profiles in bulk.
   *
   * @example
   * ```typescript
   * const address1 = '0x1234...';
   * const address2 = '0x5678...';
   * const { profiles, errors } = await profilesClient.fetchBulk([address1, address2]);
   * console.log(profiles.get(address1)?.ens); // 'test.eth'
   * console.log(profiles.get('test.eth')?.address); // '0x1234...'
   * console.log(profiles.get(address2)?.ens); // undefined
   * console.log(errors.get(address2)?.message); // 'Profile not found'
   * ```
   *
   * @param queries The ETH addresses or ENS.
   * @param options Options to pass to the fetch call.
   * @returns A map of input addresses (ETH address or ENS) to profiles, and a map of failed queries to errors.
   */
  async fetchBulk(
    queries: string[],
    options?: RequestInit,
  ): Promise<FetchBulkProfilesResponse> {
    const { profiles, errors } = await this.profileApiProvider.getBulkProfiles(
      queries,
      options,
    );

    return {
      profiles: this.createProfilesMap(profiles),
      errors: this.createErrorsMap(errors || []),
    };
  }

  private createProfilesMap(profiles: ProfileResponse[]): Map<string, Profile> {
    const profilesMap = new Map<string, Profile>();
    for (const response of profiles) {
      if (profilesMap.has(response.address)) {
        continue;
      }

      const profile = Profile.fromResponse(
        response,
        this.profileApiProvider.apiUrl,
      );
      profilesMap.set(profile.address, profile);
      if (profile.ens) {
        profilesMap.set(profile.ens, profile);
      }
    }
    return profilesMap;
  }

  private createErrorsMap(
    errors: ProfilesBulkError[],
  ): Map<string, ProfileError> {
    const errorsMap = new Map<string, ProfileError>();
    for (const error of errors) {
      errorsMap.set(error.id, { message: error.message });
    }
    return errorsMap;
  }
}
