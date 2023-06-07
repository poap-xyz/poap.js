import { POAP, PoapsClient } from '@poap-xyz/poaps';
import { PaginatedResult } from '@poap-xyz/utils';

export const fetch_multiple_poaps = async (
  client: PoapsClient,
): Promise<void> => {
  try {
    const data: PaginatedResult<POAP> = await client.fetch({
      order: 'asc',
      limit: 10,
      offset: 1,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
