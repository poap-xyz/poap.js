import { MomentsClient } from '@poap-xyz/moments';
import {
  PoapCompass,
  PoapMomentsApi,
  AuthenticationProviderHttp,
} from '@poap-xyz/providers';
import { create_moment } from './methods/create_moment';
import { fetch_multiple_moments } from './methods/fetch_multiple_moments';
import { fetch_single_moment } from './methods/fetch_single_moment';
import { fetch_moments_by_drop_ids } from './methods/fetch_moments_by_drop_ids';
import { getRequiredEnvVar } from './methods/get_required_env_var';
import dotenv from 'dotenv';

dotenv.config();

async function main(): Promise<void> {
  const momentsApi = new PoapMomentsApi({
    // You need to provide an authentication provider for write operations
    authenticationProvider: new AuthenticationProviderHttp(
      getRequiredEnvVar('CLIENT_ID'),
      getRequiredEnvVar('CLIENT_SECRET'),
    ),
  });

  // We use Compass for read operations
  const compass = new PoapCompass('your_api_key');

  // Use your library here
  const client = new MomentsClient(momentsApi, compass);
  // Create Moment

  await create_moment(client);
  // Fetch multiple moments
  await fetch_multiple_moments(client);
  // Fetch one moment by id
  await fetch_single_moment(client);
  // Fetch moments by drop ids
  await fetch_moments_by_drop_ids(client);
}

main().catch(() => {
  process.exit(1);
});
