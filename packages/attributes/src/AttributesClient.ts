import {
  RegistryApiProvider,
  CreateAttributeInput,
  CreateAttributesBulkInput,
  CompassProvider,
} from '@poap-xyz/providers';
import { PaginatedResult } from '@poap-xyz/utils';
import { Attribute } from './domain/Attribute';
import { FetchAttributesInput } from './types';
import { AttributesQueryResponse, PAGINATED_ATTRIBUTES_QUERY } from './queries';
import { createFilter, creatEqFilter } from './queries/utils';

/**
 * A client for creating attributes.
 * @class AttributesClient
 */
export class AttributesClient {
  /**
   * Creates a new AttributesClient.
   *
   * @constructor
   * @param {RegistryApiProvider} RegistryApiProvider - The registry API provider to use for creating attributes.
   */
  constructor(
    private RegistryApiProvider: RegistryApiProvider,
    private CompassProvider: CompassProvider,
  ) {}

  /**
   * Creates a single attribute.
   *
   * @async
   * @function
   * @name AttributesClient#create
   * @param {CreateAttributeInput} input - The input data for creating the attribute.
   * @returns {Promise<Attribute>} A Promise that resolves with the created attribute.
   */
  async create(input: CreateAttributeInput): Promise<Attribute> {
    const repsonse = await this.RegistryApiProvider.createAttribute(input);
    return new Attribute({
      ...repsonse,
      timestamp: new Date(repsonse.timestamp),
    });
  }

  /**
   * Creates multiple attributes.
   *
   * @async
   * @function
   * @name AttributesClient#createBulk
   * @param {CreateAttributesBulkInput} input - The input data for creating the attributes.
   * @returns {Promise<Attribute[]>} A Promise that resolves with an array of the created attributes.
   */
  async createBulk(input: CreateAttributesBulkInput): Promise<Attribute[]> {
    const repsonse = await this.RegistryApiProvider.createAttributesBulk(input);
    return repsonse.map(
      (attribute) =>
        new Attribute({
          ...attribute,
          timestamp: new Date(attribute.timestamp),
        }),
    );
  }

  /**
   * Fetches a paginated list of attributes filtered by `key` and `value` and sorted by `order`.
   * @async
   * @function
   * @param {FetchAttributesInput} input - An object containing the input parameters.
   * @param {number} input.limit - The maximum number of attributes to retrieve per page.
   * @param {number} input.offset - The offset to start retrieving attributes from.
   * @param {number} input.id - The offset to start retrieving attributes from.
   * @param {string} input.order - The attribute order to use. Can be "asc" or "desc".
   * @param {string} input.key - The key to filter the attributes by.
   * @param {string} input.value - The value to filter the attributes by.
   * @returns {Promise<PaginatedResult<Attribute>>} - A promise that resolves to a paginated result of attributes.
   */
  async fetch({
    limit,
    offset,
    id,
    order,
    key,
    value,
  }: FetchAttributesInput): Promise<PaginatedResult<Attribute>> {
    const { attributes_aggregate } =
      await this.CompassProvider.request<AttributesQueryResponse>(
        PAGINATED_ATTRIBUTES_QUERY,
        {
          limit,
          offset,
          order_by: { id: order },
          where: {
            ...createFilter('key', key),
            ...createFilter('value', value),
            ...creatEqFilter('id', id),
          },
        },
      );

    const attributes: Attribute[] = attributes_aggregate.nodes.map(
      (attribute) => {
        return new Attribute({
          id: attribute.id,
          dropId: attribute.drop_id,
          key: attribute.key,
          value: attribute.value,
          timestamp: new Date(attribute.timestamp),
          tokenId: attribute.tokenId ?? 0,
        });
      },
    );

    const endIndex = offset + attributes.length;

    const result = new PaginatedResult<Attribute>(
      attributes,
      endIndex < offset + limit ? null : endIndex,
    );

    return result;
  }
}
