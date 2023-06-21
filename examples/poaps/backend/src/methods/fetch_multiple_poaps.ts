import { POAP, PoapsClient, PoapsSortFields } from '@poap-xyz/poaps';
import { Order, PaginatedResult } from '@poap-xyz/utils';

export const fetch_multiple_poaps = async (
  client: PoapsClient,
): Promise<void> => {
  try {
    const data: PaginatedResult<POAP> = await client.fetch({
      sort_field: PoapsSortFields.MintedOn,
      sort_dir: Order.ASC,
      limit: 10,
      offset: 0,
    });
    console.log(data);
    console.log('The first 10 POAP tokens minted.');
  } catch (error) {
    console.log(error);
  }
};
