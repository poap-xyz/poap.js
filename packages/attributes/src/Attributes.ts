import {
  CompassProvider,
  RegistryApiProvider,
  CreateAttributeInput,
} from '@rlajous/providers';
import { Attribute } from './domain/Attribute';
// import { PaginatedResult } from './utils/types';

export class Attributes {
  constructor(
    private CompassProvider: CompassProvider,
    private RegistryApiProvider: RegistryApiProvider,
  ) {}

  async create(input: CreateAttributeInput): Promise<Attribute> {
    const repsonse = await this.RegistryApiProvider.createAttribute(input);
    return new Attribute({
      ...repsonse,
      timestamp: new Date(repsonse.timestamp),
    });
  }

  async createBulk(input: CreateBulkAttributeInput): Promise<Attribute[]> {
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
