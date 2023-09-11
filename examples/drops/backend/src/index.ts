import { measurePerformance } from '@poap-xyz/performance';
import { DropsClient } from '@poap-xyz/drops';
import { PoapCompass, PoapDropApi } from '@poap-xyz/providers';
import { fetch_multiple_drops } from './methods/fetch_multiple_drops';
import { fetch_single_drop } from './methods/fetch_single_drop';
import { create_drop } from './methods/create_drop';

async function main(): Promise<void> {
  // Use your library here
  const client = new DropsClient(
    new PoapCompass('you_api_key'),
    new PoapDropApi('you_api_key'),
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
