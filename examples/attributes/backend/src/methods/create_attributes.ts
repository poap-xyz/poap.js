import { AttributesClient } from '@poap-xyz/attributes';
import {
  CreateAttribute,
  CreateAttributesBulkInput,
} from '@poap-xyz/providers';

export const create_attributes = async (
  client: AttributesClient,
): Promise<void> => {
  const attribute: CreateAttribute = {
    key: 'test',
    value: 'test',
    dropId: 110148,
  };
  const input: CreateAttributesBulkInput = {
    attributes: [attribute],
  };
  const response = await client.createBulk(input);
  console.log(response);
};
