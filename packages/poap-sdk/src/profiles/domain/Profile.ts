import { ProfileResponse } from '../../providers/ports/ProfilesApiProvider';

export class Profile {
  address: string;
  ens: string;
  avatar: string | null;
  header: string | null;

  constructor({ address, ens, avatar, header }: Profile) {
    this.address = address;
    this.ens = ens;
    this.avatar = avatar;
    this.header = header;
  }

  public static fromResponse(
    response: ProfileResponse,
    apiUrl: string,
  ): Profile {
    return new Profile({
      address: response.address,
      ens: response.ens,
      avatar: response.records.avatar
        ? `${apiUrl}/avatar/${response.ens}`
        : null,
      header: response.records.header
        ? `${apiUrl}/header/${response.ens}`
        : null,
    });
  }
}
