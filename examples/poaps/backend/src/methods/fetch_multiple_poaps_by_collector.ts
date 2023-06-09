import { POAP, PoapsClient } from '@poap-xyz/poaps';
import { PaginatedResult } from '@poap-xyz/utils';

export const fetch_multiple_poaps_by_collector = async (
  client: PoapsClient,
): Promise<void> => {
  try {
    const data: PaginatedResult<POAP> = await client.fetch({
      order: 'asc',
      limit: 10,
      offset: 0,
      collector_address: '0xf6B6F07862A02C85628B3A9688beae07fEA9C863',
    });
    console.log(data);
    console.log(
      'The first 10 POAP tokens minted by collector 0xf6B6F07862A02C85628B3A9688beae07fEA9C863.',
    );
  } catch (error) {
    console.log(error);
  }
};
