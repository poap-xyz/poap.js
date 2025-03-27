import { ProfileResponse } from '../../providers/ports/ProfilesApiProvider/types/ProfileResponse';

export class Profile {
  constructor(
    public address: string,
    public ens: string,
    public avatar: string | null,
    public header: string | null,
    /** The UNIX timestamp of the last time the profile was cached by the API. */
    public fresh: number,
  ) {}

  public static fromResponse(
    response: ProfileResponse,
    apiUrl: string,
  ): Profile {
    return new Profile(
      response.address,
      response.ens,
      response.records.avatar ? `${apiUrl}/avatar/${response.ens}` : null,
      response.records.header ? `${apiUrl}/header/${response.ens}` : null,
      response.fresh,
    );
  }
}
