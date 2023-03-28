import { HttpProvider } from './HttpProvider';
import { PaginatedResult } from '../../utils/types';
import {
  Attribute,
  FetchAttributeInput,
  FetchVersionDropAttributeInput,
  FetchAttributesInput,
  VersionedAttribute,
} from '../../types';
import { RegisrtyProvider } from '../RegistryProvider';
import { PoapGraphqlFetchProvider } from './PoapGraphqlFetchProvider';
import {
  Attribute_QUERY,
  PAGINATED_Attribute_QUERY,
  VERSION_Attribute_BY_DROP_QUERY,
} from './queries';
import { WhereAttribute } from './types/filter';
import {
  AttributeQueryResponse,
  AttributesQueryResponse,
  VersionedAttributeQueryResponse,
} from './types/response';

export class PoapRegistryProvider implements RegisrtyProvider {
  private PoapGraphqlFetchProvider: PoapGraphqlFetchProvider;

  constructor(apiKey: string, HttpProvider: HttpProvider) {
    this.PoapGraphqlFetchProvider = new PoapGraphqlFetchProvider(
      apiKey,
      HttpProvider,
    );
  }

  async fetchAttributes({
    limit,
    offset,
    order,
    key,
    value,
  }: FetchAttributesInput): Promise<PaginatedResult<Attribute>> {
    const where: WhereAttribute = {};

    if (key) {
      where['key'] = { _ilike: `%${key}%` };
    }

    if (value) {
      where['value'] = { _ilike: `%${value}%` };
    }

    const { attributes_aggregate } =
      await this.PoapGraphqlFetchProvider.request<AttributesQueryResponse>(
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
      await this.PoapGraphqlFetchProvider.request<AttributeQueryResponse>(
        Attribute_QUERY,
        {
          attribute: { id: { _eq: id } },
        },
      );
    return attributes[0] ?? null;
  }

  async fetchVersionDropAttribute({
    limit,
    offset,
    dropId,
  }: FetchVersionDropAttributeInput): Promise<
    PaginatedResult<VersionedAttribute>
  > {
    const { attributes } =
      await this.PoapGraphqlFetchProvider.request<VersionedAttributeQueryResponse>(
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
