import { PaginatedResult } from '../utils/types';
import {
  Attribute,
  FetchAttributesInput,
  VersionedAttribute,
  FetchAttributeInput,
  FetchVersionDropAttributeInput,
} from '../types';

export interface RegistryProvider {
  fetchAttributes(
    PaginatedAttributeInput: FetchAttributesInput,
  ): Promise<PaginatedResult<Attribute>>;

  fetchAttribute(
    FetchAttributeInput: FetchAttributeInput,
  ): Promise<Attribute | null>;

  fetchVersionDropAttribute(
    FetchVersionDropAttributeInput: FetchVersionDropAttributeInput,
  ): Promise<PaginatedResult<VersionedAttribute>>;
}
