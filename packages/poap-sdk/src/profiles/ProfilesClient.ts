import { ProfilesApiProvider } from '../providers';
import { Profile } from './domain/Profile';

export class ProfilesClient {
  /**
   * @constructor
   * @param profileApiProvider The provider for the POAP profile API.
   */
  constructor(private profileApiProvider: ProfilesApiProvider) {}

  /**
   * @param address The ETH address or ENS.
   * @returns The profile, or null if not found.
   */
  async fetch(address: string): Promise<Profile | null> {
    const response = await this.profileApiProvider.getProfile(address);
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
   * const profiles = await profilesClient.fetchBulk([address1, address2]);
   * console.log(profiles.get(address1)?.ens); // 'test.eth'
   * console.log(profiles.get('test.eth')?.address); // '0x1234...'
   * console.log(profiles.get(address2)?.ens); // undefined
   *
   * @param addresses The ETH addresses or ENS.
   * @returns A map of input addresses (ETH address or ENS) to profiles. All
   * map keys are lowercased.
   */
  async fetchBulk(addresses: string[]): Promise<Map<string, Profile>> {
    const profiles = await this.profileApiProvider.getBulkProfiles(addresses);
    if (!profiles.length) {
      return new Map();
    }

    const map = new Map<string, Profile>();
    for (const profileResponse of profiles) {
      const profile = Profile.fromResponse(
        profileResponse,
        this.profileApiProvider.apiUrl,
      );
      map.set(profile.address.toLowerCase(), profile);
      map.set(profile.ens.toLowerCase(), profile);
    }
    return map;
  }
}
