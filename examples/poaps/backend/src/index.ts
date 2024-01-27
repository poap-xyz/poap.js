import { PoapsClient } from '@poap-xyz/poaps';
import {
  AuthenticationProviderHttp,
  PoapCompass,
  PoapTokenApi,
} from '@poap-xyz/providers';
import { fetch_multiple_poaps } from './methods/fetch_multiple_poaps';
import { fetch_single_poap } from './methods/fetch_single_poap';
import { fetch_multiple_poaps_by_collector } from './methods/fetch_multiple_poaps_by_collector';
import { fetch_multiple_poaps_by_drop_id } from './methods/fetch_multiple_poaps_by_drop_id';
import { mint_sync_poap } from './methods/mint_sync_poap';
import { getRequiredEnvVar } from './methods/get_required_env_var';
import { mint_async_poap } from './methods/mint_async_poap';
import { email_reservation_poap } from './methods/email_reservation_poap';
import dotenv from 'dotenv';

dotenv.config();

async function main(): Promise<void> {
  // Use your library here
  const client = new PoapsClient(
    new PoapCompass({
      apiKey: getRequiredEnvVar('API_KEY'),
    }),
    new PoapTokenApi({
      apiKey: getRequiredEnvVar('API_KEY'),
      baseUrl: getRequiredEnvVar('POAP_TOKEN_BASE_URL'),
      authenticationProvider: new AuthenticationProviderHttp(
        getRequiredEnvVar('CLIENT_ID'),
        getRequiredEnvVar('CLIENT_SECRET'),
        getRequiredEnvVar('OAUTH_SERVER_DOMAIN'),
      ),
    }),
  );
  // Multiple POAPs
  await fetch_multiple_poaps(client);
  // One POAP by id
  await fetch_single_poap(client);
  // Multiple POAPs by collector
  await fetch_multiple_poaps_by_collector(client);
  // Multiple POAPs by drop
  await fetch_multiple_poaps_by_drop_id(client);
  // mint Sync POAP
  await mint_sync_poap(client);
  // mint Async POAP
  await mint_async_poap(client);
  // Email Reservation POAP
  await email_reservation_poap(client);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
