import { RegisrtyProvider } from '../ports/RegistryProvider';
import {
  Attribute,
  FetchAttributeInput,
  FetchVersionPaginatedDropAttributeInput,
  PaginatedAttributeInput,
  VersionedAttribute,
} from '../types';
import { PaginatedResult } from '../utils/types';

export class AttributeService {
  constructor(private registryProvider: RegisrtyProvider) {}

  async fetchVersionPaginatedDropAttribute({
    limit,
    offset,
    dropId,
  }: FetchVersionPaginatedDropAttributeInput): Promise<
    PaginatedResult<VersionedAttribute>
  > {
    return this.registryProvider.fetchVersionPaginatedDropAttribute({
      limit,
      offset,
      dropId,
    });
  }

  async paginatedAttribute({
    limit,
    offset,
    order,
    key,
    value,
  }: PaginatedAttributeInput): Promise<PaginatedResult<Attribute>> {
    return this.registryProvider.paginatedAttribute({
      limit,
      offset,
      order,
      key,
      value,
    });
  }

  async fetchAttribute({ id }: FetchAttributeInput): Promise<Attribute | null> {
    return this.registryProvider.fetchAttribute({ id });
  }
}
