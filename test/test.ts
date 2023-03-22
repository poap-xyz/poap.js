import { RegistryApiClient } from '@poap-xyz/registry'; // Replace with the correct path to your RegistryApiClient class

(async () => {
  try {
    // Initialize the RegistryApiClient with an API key
    const client = new RegistryApiClient('your-api-key-here');

    // Test fetchVersionPaginatedDropMetadata method
    const fetchVersionPaginatedDropMetadataResult = await client.fetchVersionPaginatedDropMetadata({
      limit: 10,
      offset: 0,
      dropId: 1,
    });
    console.log('fetchVersionPaginatedDropMetadata Result:', fetchVersionPaginatedDropMetadataResult);

    // Test paginatedMetadata method
    const paginatedMetadataResult = await client.paginatedMetadata({
      limit: 10,
      offset: 0,
      order: 'desc',
      key: 'example-key',
      value: 'example-value',
    });
    console.log('paginatedMetadata Result:', paginatedMetadataResult);

    // Test fetchMetadata method
    const fetchMetadataResult = await client.fetchMetadata({
      id: 1,
    });
    console.log('fetchMetadata Result:', fetchMetadataResult);

    // Test paginatedDrops method
    const paginatedDropsResult = await client.paginatedDrops({
      limit: 10,
      offset: 0,
      order: 'desc',
      key: 'example-key',
      value: 'example-value',
      name: 'example-name',
      nameOrder: 'asc',
      idOrder: 'desc',
      withMetadata: 'yes',
      from: '2023-01-01',
      to: '2023-12-31',
    });
    console.log('paginatedDrops Result:', paginatedDropsResult);

  } catch (error) {
    console.error('Error:', error);
  }
})();
