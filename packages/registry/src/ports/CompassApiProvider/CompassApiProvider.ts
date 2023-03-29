import { PaginatedResult } from '../../utils/types';
import {
  FetchAttributesInput,
  VersionedAttribute,
  FetchAttributeInput,
  FetchVersionDropAttributeInput,
} from '../../types';

import { Attribute } from '../../domain/Attribute';

export interface CompassApiProvider {
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
