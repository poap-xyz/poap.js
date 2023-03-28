import { ApiProvider } from './../api/ApiProvider';
import {
  FetchAttributeInput,
  FetchVersionPaginatedDropAttributeInput,
} from '../types/input';
import { PaginatedResult } from '../utils/types';
import {
  Attribute,
  AttributesQueryResponse,
  AttributeQueryResponse,
  PaginatedAttributeInput,
  VersionedAttribute,
  VersionedAttributeQueryResponse,
  WhereAttribute,
} from '../types';
import { RegisrtyProvider } from './RegistryProvider';
import { ApiService } from '../api/api.service';
import {
  Attribute_QUERY,
  PAGINATED_Attribute_QUERY,
  VERSION_Attribute_BY_DROP_QUERY,
} from '../Attribute/queries';

export class PoapRegistryProvider implements RegisrtyProvider {
  private apiService: ApiService;

  constructor(apiKey: string, ApiProvider: ApiProvider) {
    this.apiService = new ApiService(apiKey, ApiProvider);
  }

  async paginatedAttribute({
    limit,
    offset,
    order,
    key,
    value,
  }: PaginatedAttributeInput): Promise<PaginatedResult<Attribute>> {
    const where: WhereAttribute = {};

    if (key) {
      where['key'] = { _ilike: `%${key}%` };
    }

    if (value) {
      where['value'] = { _ilike: `%${value}%` };
    }

    const { attributes_aggregate } =
      await this.apiService.request<AttributesQueryResponse>(
        PAGINATED_Attribute_QUERY,
        {
          limit,
          offset,
          order_by: { id: order },
          where,
        },
      );

    const result = new PaginatedResult<Attribute>(
      attributes_aggregate.nodes,
      attributes_aggregate.nodes.length > 0
        ? limit + 1 + attributes_aggregate.nodes.length
        : null,
    );

    return result;
  }

  async fetchAttribute({ id }: FetchAttributeInput): Promise<Attribute | null> {
    const { attributes } =
      await this.apiService.request<AttributeQueryResponse>(Attribute_QUERY, {
        attribute: { id: { _eq: id } },
      });
    return attributes[0] ?? null;
  }

  async fetchVersionPaginatedDropAttribute({
    limit,
    offset,
    dropId,
  }: FetchVersionPaginatedDropAttributeInput): Promise<
    PaginatedResult<VersionedAttribute>
  > {
    const { attributes } =
      await this.apiService.request<VersionedAttributeQueryResponse>(
        VERSION_Attribute_BY_DROP_QUERY,
        {
          limit,
          offset,
          dropId,
        },
      );

    const result = new PaginatedResult<VersionedAttribute>(
      attributes,
      attributes.length > 0 ? limit + 1 + attributes.length : null,
    );

    return result;
  }
}
