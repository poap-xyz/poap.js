/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropsClient } from '@poap-xyz/drops';
import { PoapCompass, PoapDropApi } from '@poap-xyz/providers';
import { fetch_multiple_drops } from './methods/fetch_multiple_drops';
import { fetch_single_drop } from './methods/fetch_single_drop';
import { create_drop } from './methods/create_drop';

async function main(): Promise<void> {
  // Use your library here
  const client = new DropsClient(
    new PoapCompass('you_api_key'),
    new PoapDropApi('your_api_key'),
  );
  // Multiple Drops
  await fetch_multiple_drops(client);
  // One Drop by id
  await fetch_single_drop(client);
  // Create Drop
  await create_drop(client);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
