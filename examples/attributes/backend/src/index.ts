/* eslint-disable @typescript-eslint/no-explicit-any */
import { AttributesClient } from '@poap-xyz/attributes';
import { PoapCompass, PoapRegistryApi } from '@poap-xyz/providers';
import { fetch_multiple_attributes } from './methods/fetch_multiple_attributes';
import { fetch_single_attributes } from './methods/fetch_single_attribute';
import { create_attributes } from './methods/create_attributes';

async function main(): Promise<void> {
  // Use your library here
  const client = new AttributesClient(
    new PoapRegistryApi('your_api_key'),
    new PoapCompass('your_api_key'),
  );
  // multiple attributes
  await fetch_multiple_attributes(client);
  // one attribute by id
  await fetch_single_attributes(client);
  // Create an attribute or more
  await create_attributes(client);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
