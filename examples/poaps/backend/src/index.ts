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
import { claim_sync_poap } from './methods/claim_sync_poap';
import { getRequiredEnvVar } from './methods/get_required_env_var';
import { claim_async_poap } from './methods/claim_async_poap';
import { email_reservation_poap } from './methods/email_reservation_poap';
import dotenv from 'dotenv';

dotenv.config();

async function main(): Promise<void> {
  // Use your library here
  const client = new PoapsClient(
    new PoapCompass(getRequiredEnvVar('API_KEY')),
    new PoapTokenApi(
      getRequiredEnvVar('API_KEY'),
      getRequiredEnvVar('POAP_TOKEN_BASE_URL'),
      new AuthenticationProviderHttp(
        getRequiredEnvVar('CLIENT_ID'),
        getRequiredEnvVar('CLIENT_SECRET'),
        getRequiredEnvVar('OAUTH_SERVER_DOMAIN'),
      ),
    ),
  );
  // Multiple Poaps
  await measurePerformance(
    () => fetch_multiple_poaps(client),
    'fetch_multiple_poaps',
  );
  // One Poap by id
  await measurePerformance(
    () => fetch_single_poap(client),
    'fetch_single_poap',
  );
  // Multiple Poaps by collector
  await measurePerformance(
    () => fetch_multiple_poaps_by_collector(client),
    'fetch_multiple_poaps_by_collector',
  );
  // Multiple Poaps by drop
  await measurePerformance(
    () => fetch_multiple_poaps_by_drop_id(client),
    'fetch_multiple_poaps_by_drop_id',
  );
  // Claim Sync Poap
  await measurePerformance(() => claim_sync_poap(client), 'claim_sync_poap');
  // Claim Async Poap
  await measurePerformance(() => claim_async_poap(client), 'claim_async_poap');
  // Email Reservation Poap
  await measurePerformance(
    () => email_reservation_poap(client),
    'email_reservation_poap',
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
