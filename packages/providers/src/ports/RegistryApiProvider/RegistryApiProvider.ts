import {
  CreateAttributeInput,
  CreateAttributeResponse,
  CreateAttributesBulkInput,
  CreateAttributesBulkResponse,
} from './Types';

export interface RegistryApiProvider {
  createAttributesBulk(
    input: CreateAttributesBulkInput,
  ): Promise<CreateAttributesBulkResponse>;

  createAttribute(
    input: CreateAttributeInput,
  ): Promise<CreateAttributeResponse>;
}
