import { FetchMomentsInput, Moment, MomentsClient } from '@poap-xyz/moments';
import { PaginatedResult } from '@poap-xyz/utils';

export const fetch_multiple_moments = async (
  client: MomentsClient,
): Promise<void> => {
  const input: FetchMomentsInput = {
    offset: 0,
    limit: 10,
    idOrder: 'desc',
  };

  try {
    const data: PaginatedResult<Moment> = await client.fetch(input);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
