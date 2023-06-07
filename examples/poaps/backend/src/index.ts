/* eslint-disable @typescript-eslint/no-explicit-any */
import { PoapsClient } from '@poap-xyz/poaps';
import { PoapCompass } from '@poap-xyz/providers';
import { fetch_multiple_poaps } from './methods/fetch_multiple_poaps';
import { fetch_single_poap } from './methods/fetch_single_poap';

async function main(): Promise<void> {
  // Use your library here
  const client = new PoapsClient(new PoapCompass('you_api_key'));
  // Multiple Drops
  await fetch_multiple_poaps(client);
  // One Drop by id
  await fetch_single_poap(client);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
