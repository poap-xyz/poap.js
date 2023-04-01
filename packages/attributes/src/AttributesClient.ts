import {
  RegistryApiProvider,
  CreateAttributeInput,
  CreateAttributesBulkInput,
} from '@rlajous/providers';
import { Attribute } from './domain/Attribute';

export class AttributesClient {
  constructor(private RegistryApiProvider: RegistryApiProvider) {}

  async create(input: CreateAttributeInput): Promise<Attribute> {
    const repsonse = await this.RegistryApiProvider.createAttribute(input);
    return new Attribute({
      ...repsonse,
      timestamp: new Date(repsonse.timestamp),
    });
  }

  async createBulk(input: CreateAttributesBulkInput): Promise<Attribute[]> {
    const repsonse = await this.RegistryApiProvider.createAttributesBulk(input);
    return repsonse.map(
      (attribute) =>
        new Attribute({
          ...attribute,
          timestamp: new Date(attribute.timestamp),
        }),
    );
  }
}
