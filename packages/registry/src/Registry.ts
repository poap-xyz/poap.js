import {
  Attribute,
  FetchAttributeInput,
  FetchVersionPaginatedDropAttributeInput,
  PaginatedAttributeInput,
  VersionedAttribute,
} from './types';
import { PaginatedResult } from './utils/types';
import { RegisrtyProvider } from './ports/RegistryProvider';

export class Registry {
  constructor(private regsitryProvider: RegisrtyProvider) {}

  async fetchVersionPaginatedDropAttribute(
    input: FetchVersionPaginatedDropAttributeInput,
  ): Promise<PaginatedResult<VersionedAttribute>> {
    return this.regsitryProvider.fetchVersionPaginatedDropAttribute(input);
  }

  async paginatedAttribute(
    input: PaginatedAttributeInput,
  ): Promise<PaginatedResult<Attribute>> {
    return this.regsitryProvider.paginatedAttribute(input);
  }

  async fetchAttribute(input: FetchAttributeInput): Promise<Attribute | null> {
    return this.regsitryProvider.fetchAttribute(input);
  }
}
