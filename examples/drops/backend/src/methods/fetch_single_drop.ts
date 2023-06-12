import { Drop, DropsClient } from '@poap-xyz/drops';
import { DropsSortFields } from '@poap-xyz/drops/dist/cjs/types';
import { Order, PaginatedResult } from '@poap-xyz/utils';

export const fetch_single_drop = async (client: DropsClient): Promise<void> => {
  try {
    const data: PaginatedResult<Drop> = await client.fetch({
      sort_field: DropsSortFields.Id,
      sort_dir: Order.ASC,
      limit: 10,
      offset: 0,
      ids: [1],
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
