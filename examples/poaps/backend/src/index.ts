import { measurePerformance } from '@poap-xyz/performance';
import { PoapsClient } from '@poap-xyz/poaps';
import { PoapCompass } from '@poap-xyz/providers';
import { fetch_multiple_poaps } from './methods/fetch_multiple_poaps';
import { fetch_single_poap } from './methods/fetch_single_poap';
import { fetch_multiple_poaps_by_collector } from './methods/fetch_multiple_poaps_by_collector';
import { fetch_multiple_poaps_by_drop_id } from './methods/fetch_multiple_poaps_by_drop_id';

async function main(): Promise<void> {
  // Use your library here
  const client = new PoapsClient(new PoapCompass('you_api_key'));
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
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
