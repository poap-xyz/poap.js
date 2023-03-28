import { AttributeService } from './Attribute/Attribute.service';
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
  private AttributeService: AttributeService;

  constructor(regsitryProvider: RegisrtyProvider) {
    this.AttributeService = new AttributeService(regsitryProvider);
  }

  async fetchVersionPaginatedDropAttribute(
    input: FetchVersionPaginatedDropAttributeInput,
  ): Promise<PaginatedResult<VersionedAttribute>> {
    return this.AttributeService.fetchVersionPaginatedDropAttribute(input);
  }

  async paginatedAttribute(
    input: PaginatedAttributeInput,
  ): Promise<PaginatedResult<Attribute>> {
    return this.AttributeService.paginatedAttribute(input);
  }

  async fetchAttribute(input: FetchAttributeInput): Promise<Attribute | null> {
    return this.AttributeService.fetchAttribute(input);
  }
}
