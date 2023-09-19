import { POAP, PoapsClient, PoapsSortFields } from '@poap-xyz/poaps';
import { Order, PaginatedResult } from '@poap-xyz/utils';

export const fetch_multiple_poaps_by_drop_id = async (
  client: PoapsClient,
): Promise<void> => {
  try {
    const data: PaginatedResult<POAP> = await client.fetch({
      sortField: PoapsSortFields.MintedOn,
      sortDir: Order.DESC,
      limit: 10,
      offset: 0,
      dropId: 3,
      filterByZeroAddress: true,
    });
    console.log(data);
    console.log('The first 10 POAP tokens minted for the drop 14.');
  } catch (error) {
    console.log(error);
  }
};
