import { measurePerformance } from '@poap-xyz/performance';
import { DropsClient } from '@poap-xyz/drops';
import { PoapCompass, PoapDropApi } from '@poap-xyz/providers';
import { fetch_multiple_drops } from './methods/fetch_multiple_drops';
import { fetch_single_drop } from './methods/fetch_single_drop';
import { create_drop } from './methods/create_drop';
import { getRequiredEnvVar } from './methods/get_required_env_var';

import dotenv from 'dotenv';

dotenv.config();

async function main(): Promise<void> {
  // Use your library here
  const client = new DropsClient(
    new PoapCompass({ apiKey: getRequiredEnvVar('API_KEY') }),
    new PoapDropApi({
      apiKey: getRequiredEnvVar('API_KEY'),
      baseUrl: getRequiredEnvVar('POAP_DROPS_BASE_URL'),
    }),
  );
  // Multiple Drops
  await measurePerformance(
    () => fetch_multiple_drops(client),
    'fetch_multiple_drops',
  );
  // One Drop by id
  await measurePerformance(
    () => fetch_single_drop(client),
    'fetch_single_drop',
  );
  // Create Drop
  await measurePerformance(() => create_drop(client), 'create_drop');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
