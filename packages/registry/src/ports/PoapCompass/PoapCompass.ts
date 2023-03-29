import { HttpProvider } from './HttpProvider';
import { PaginatedResult } from '../../utils/types';
import {
  FetchAttributeInput,
  FetchVersionDropAttributeInput,
  FetchAttributesInput,
  VersionedAttribute,
} from '../../types';
import { CompassApiProvider } from '../CompassApiProvider';
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
import { Attribute } from '../../domain/Attribute';

export class PoapCompass implements CompassApiProvider {
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

    const attributes: Attribute[] = attributes_aggregate.nodes.map(
      (attribute) => {
        return new Attribute(
          attribute.id,
          attribute.dropId,
          attribute.key,
          attribute.value,
          new Date(attribute.timestamp),
          attribute.tokenId ?? 0,
        );
      },
    );

    const result = new PaginatedResult<Attribute>(
      attributes,
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
    return attributes[0]
      ? new Attribute(
          attributes[0].id,
          attributes[0].dropId,
          attributes[0].key,
          attributes[0].value,
          new Date(attributes[0].timestamp),
          attributes[0].tokenId ?? 0,
        )
      : null;
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
