import { ProfileResponse } from '../../providers/ports/ProfilesApiProvider';

export class Profile {
  constructor(
    public address: string,
    public ens: string,
    public avatar: string | null,
    public header: string | null,
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
    );
  }
}
