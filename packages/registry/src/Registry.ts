import {
  Attribute,
  FetchAttributeInput,
  FetchVersionDropAttributeInput,
  FetchAttributesInput,
  VersionedAttribute,
} from './types';
import { PaginatedResult } from './utils/types';
import { RegistryProvider } from './ports/RegistryProvider';

export class Registry {
  constructor(private regsitryProvider: RegistryProvider) {}

  async fetchVersionPaginatedDropAttribute(
    input: FetchVersionDropAttributeInput,
  ): Promise<PaginatedResult<VersionedAttribute>> {
    return this.regsitryProvider.fetchVersionDropAttribute(input);
  }

  async fetchAttributes(
    input: FetchAttributesInput,
  ): Promise<PaginatedResult<Attribute>> {
    return this.regsitryProvider.fetchAttributes(input);
  }

  async fetchAttribute(input: FetchAttributeInput): Promise<Attribute | null> {
    return this.regsitryProvider.fetchAttribute(input);
  }
}
