import { DropsClient } from '@poap-xyz/drops';
import { PoapCompass, PoapDropApi } from '@poap-xyz/providers';
import { create_drop } from './methods/create_drop';
import { fetch_drop_image } from './methods/fetch_drop_image';
import { fetch_multiple_drops } from './methods/fetch_multiple_drops';
import { fetch_single_drop } from './methods/fetch_single_drop';
import { getRequiredEnvVar } from './methods/get_required_env_var';

import dotenv from 'dotenv';

dotenv.config();

async function main(): Promise<void> {
  // Use your library here
  const client = new DropsClient(
    new PoapCompass({
      baseUrl: getRequiredEnvVar('COMPASS_URL'),
      apiKey: getRequiredEnvVar('API_KEY'),
    }),
    new PoapDropApi({
      apiKey: getRequiredEnvVar('API_KEY'),
      baseUrl: getRequiredEnvVar('POAP_DROPS_BASE_URL'),
    }),
  );
  // Multiple Drops
  await fetch_multiple_drops(client);
  // One Drop by id
  await fetch_single_drop(client);
  // A Drop Image
  await fetch_drop_image(client);
  // Create Drop
  await create_drop(client);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
