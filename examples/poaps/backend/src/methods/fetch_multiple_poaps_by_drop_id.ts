import { POAP, PoapsClient } from '@poap-xyz/poaps';
import { PaginatedResult } from '@poap-xyz/utils';

export const fetch_multiple_poaps_by_drop_id = async (
  client: PoapsClient,
): Promise<void> => {
  try {
    const data: PaginatedResult<POAP> = await client.fetch({
      order: 'asc',
      limit: 10,
      offset: 0,
      drop_id: 14,
    });
    console.log(data);
    console.log('The first 10 POAP tokens minted for the drop 14.');
  } catch (error) {
    console.log(error);
  }
};
