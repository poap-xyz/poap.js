/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Registry, PoapRegistryProvider } from '@poap-xyz/registry';

(async () => {
  try {
    // Initialize the Registry with an API key
    const client = new Registry(new PoapRegistryProvider('your-api-key-here'));

    // Test fetchVersionPaginatedDropAttribute method
    const fetchVersionPaginatedDropAttributeResult =
      await client.fetchVersionPaginatedDropAttribute({
        limit: 10,
        offset: 0,
        dropId: 100780,
      });
    console.log(
      'fetchVersionPaginatedDropAttribute Result:',
      fetchVersionPaginatedDropAttributeResult,
    );

    // Test paginatedAttribute method
    const paginatedAttributeResult = await client.paginatedAttribute({
      limit: 10,
      offset: 0,
      order: 'desc',
      key: 'example-key',
      value: 'example-value',
    });
    console.log('paginatedAttribute Result:', paginatedAttributeResult);

    // Test fetchAttribute method
    const fetchAttributeResult = await client.fetchAttribute({
      id: 1,
    });
    console.log('fetchAttribute Result:', fetchAttributeResult);
  } catch (error) {
    console.error('Error:', error);
  }
})();
