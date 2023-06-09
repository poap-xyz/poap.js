import { Drop, DropsClient } from '@poap-xyz/drops';
import { Order, PaginatedResult } from '@poap-xyz/utils';

export const fetch_single_drop = async (client: DropsClient): Promise<void> => {
  try {
    const data: PaginatedResult<Drop> = await client.fetch({
      order: Order.ASC,
      limit: 10,
      offset: 0,
      ids: [1],
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
