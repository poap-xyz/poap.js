import { Attribute, AttributesClient } from '@poap-xyz/attributes';
import { PaginatedResult } from '@poap-xyz/utils';

export const fetch_single_attributes = async (
  client: AttributesClient,
): Promise<void> => {
  const data: PaginatedResult<Attribute> = await client.fetch({
    order: 'asc',
    limit: 10,
    offset: 0,
    id: 1,
  });
  console.log(data);
};
