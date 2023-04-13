import { Drop, DropsClient } from '@poap-xyz/drops';
import { PaginatedResult } from '@poap-xyz/utils';

export const fetch_multiple_drops = async (
  client: DropsClient,
): Promise<void> => {
  const data: PaginatedResult<Drop> = await client.fetch({
    order: 'asc',
    key: '',
    value: '',
    limit: 10,
    offset: 1,
  });
  console.log(data);
};
