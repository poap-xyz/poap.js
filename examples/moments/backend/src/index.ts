/* eslint-disable @typescript-eslint/no-explicit-any */
import { MomentsClient } from '@poap-xyz/moments';
import { PoapCompass, PoapMomentsApi } from '@poap-xyz/providers';
import { create_moment } from './methods/create_moment';
import { fetch_multiple_moments } from './methods/fetch_multiple_moments';
import { fetch_single_moment } from './methods/fetch_single_moment';

async function main(): Promise<void> {
  // Use your library here
  const client = new MomentsClient(
    new PoapMomentsApi('your_api_key'),
    new PoapCompass('your_api_key'),
  );
  // Create Moment
  await create_moment(client);
  // Fetch multiple moments
  await fetch_multiple_moments(client);
  // Fetch one moment by id
  await fetch_single_moment(client);
}

main().catch(() => {
  process.exit(1);
});
