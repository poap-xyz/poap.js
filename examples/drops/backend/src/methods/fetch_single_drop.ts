import { Drop, DropsClient } from '@poap-xyz/drops';
import { PaginatedResult } from '@poap-xyz/utils';

export const fetch_single_drop = async (client: DropsClient): Promise<void> => {
  const data: PaginatedResult<Drop> = await client.fetch({
    order: 'asc',
    limit: 10,
    offset: 0,
    id: 1,
  });
  console.log(data);
};
