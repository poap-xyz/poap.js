import { FetchMomentsInput, Moment, MomentsClient } from '@poap-xyz/moments';
import { Order, PaginatedResult } from '@poap-xyz/utils';

export const fetch_single_moment = async (
  client: MomentsClient,
): Promise<void> => {
  const input: FetchMomentsInput = {
    offset: 0,
    limit: 10,
    id: '7284219b-1bc7-43b8-ab27-44749bdd91e1',
    idOrder: Order.DESC,
  };
  try {
    const data: PaginatedResult<Moment> = await client.fetch(input);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
