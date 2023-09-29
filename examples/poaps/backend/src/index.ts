import { measurePerformance } from '@poap-xyz/performance';
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
  await measurePerformance(
    () => fetch_multiple_poaps(client),
    'fetch_multiple_poaps',
  );
  // One POAP by id
  await measurePerformance(
    () => fetch_single_poap(client),
    'fetch_single_poap',
  );
  // Multiple POAPs by collector
  await measurePerformance(
    () => fetch_multiple_poaps_by_collector(client),
    'fetch_multiple_poaps_by_collector',
  );
  // Multiple POAPs by drop
  await measurePerformance(
    () => fetch_multiple_poaps_by_drop_id(client),
    'fetch_multiple_poaps_by_drop_id',
  );
  // mint Sync POAP
  await measurePerformance(() => mint_sync_poap(client), 'mint_sync_poap');
  // mint Async POAP
  await measurePerformance(() => mint_async_poap(client), 'mint_async_poap');
  // Email Reservation POAP
  await measurePerformance(
    () => email_reservation_poap(client),
    'email_reservation_poap',
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
