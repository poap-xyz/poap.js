import { POAP, PoapsClient, PoapsSortFields } from '@poap-xyz/poaps';
import { PaginatedResult, Order } from '@poap-xyz/utils';

export const fetch_single_poap = async (client: PoapsClient): Promise<void> => {
  try {
    const data: PaginatedResult<POAP> = await client.fetch({
      sort_field: PoapsSortFields.MintedOn,
      sort_order: Order.ASC,
      limit: 10,
      offset: 0,
      ids: [1],
    });
    console.log(data);
    console.log('PaginatedResult<POAP>: But only contains one POAP');
  } catch (error) {
    console.log(error);
  }
};
