import { FetchMomentsInput, Moment, MomentsClient } from '@poap-xyz/moments';
import { PaginatedResult } from '@poap-xyz/utils';

export const fetch_moments_by_drop_ids = async (
  client: MomentsClient,
): Promise<void> => {
  console.log('fetch_moments_by_drop_ids');
  const input: FetchMomentsInput = {
    offset: 0,
    limit: 10,
    drop_ids: [1],
    idOrder: 'desc',
  };
  console.log(input);

  try {
    const data: PaginatedResult<Moment> = await client.fetch(input);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
