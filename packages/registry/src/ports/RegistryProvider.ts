import {
  FetchAttributeInput,
  FetchVersionPaginatedDropAttributeInput,
} from './../types/input';
import { PaginatedResult } from '../utils/types';
import {
  Attribute,
  PaginatedAttributeInput,
  VersionedAttribute,
} from '../types';

export interface RegisrtyProvider {
  paginatedAttribute(
    PaginatedAttributeInput: PaginatedAttributeInput,
  ): Promise<PaginatedResult<Attribute>>;

  fetchAttribute(
    FetchAttributeInput: FetchAttributeInput,
  ): Promise<Attribute | null>;

  fetchVersionPaginatedDropAttribute(
    FetchVersionPaginatedDropAttributeInput: FetchVersionPaginatedDropAttributeInput,
  ): Promise<PaginatedResult<VersionedAttribute>>;
}
