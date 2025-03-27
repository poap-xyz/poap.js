import { ProfileResponse } from './types/ProfileResponse';

export interface ProfilesApiProvider {
  readonly apiUrl: string;
  /**
   * Get a profile by address or ENS.
   * @param address ETH address or ENS
   * @returns The response from the API.
   */
  getProfile(address: string): Promise<ProfileResponse | null>;
  /**
   * Get a list of profiles by addresses or ENS. Will make multiple requests if
   * the list is too big.
   * @param addresses List of ETH addresses or ENS
   * @returns The list of responses from the API.
   */
  getBulkProfiles(addresses: string[]): Promise<ProfileResponse[]>;
}
