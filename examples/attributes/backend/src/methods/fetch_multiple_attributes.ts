import { Attribute, AttributesClient } from '@poap-xyz/attributes';
import { PaginatedResult } from '@poap-xyz/utils';

export const fetch_multiple_attributes = async (
  client: AttributesClient,
): Promise<void> => {
  const data: PaginatedResult<Attribute> = await client.fetch({
    order: 'asc',
    key: '',
    value: '',
    limit: 10,
    offset: 1,
  });
  console.log(data);
};
