import { CompassProvider, DropApiProvider } from '@rlajous/providers';
import { Drop } from './domain/Drop';
import { PaginatedDropsResponse, PAGINATED_DROPS_QUERY } from './queries';
import {
  createBetweenFilter,
  createFilter,
  createMetadataFilter,
  filterUndefinedProperties,
} from './queries/utils';
import { CreateDropsInput, FetchDropsInput, UpdateDropsInput } from './types';
import { PaginatedResult } from './utils/types';

/**
 * Represents a client for working with POAP drops.
 *
 * @class DropsClient
 */
export class DropsClient {
  /**
   * Creates a new DropsClient object.
   *
   * @constructor
   * @param {CompassProvider} CompassProvider - The provider for the POAP compass API.
   * @param {DropApiProvider} DropApiProvider - The provider for the POAP drop API.
   */
  constructor(
    private CompassProvider: CompassProvider,
    private DropApiProvider: DropApiProvider,
  ) {}

  /**
   * Fetches drops based on the specified input.
   *
   * @async
   * @method
   * @param {FetchDropsInput} input - The input for fetching drops.
   * @returns {Promise<PaginatedResult<Drop>>} A paginated result of drops.
   */
  async fetch(input: FetchDropsInput): Promise<PaginatedResult<Drop>> {
    const {
      limit,
      offset,
      order,
      key,
      value,
      name,
      nameOrder,
      idOrder,
      withMetadata,
      from,
      to,
    } = input;

    const variables = {
      limit,
      offset,
      orderBy: filterUndefinedProperties({
        start_date: order,
        name: nameOrder,
        id: idOrder,
      }),
      where: {
        private: { _eq: false },
        ...createFilter('name', name),
        ...createFilter('attributes.key', key),
        ...createFilter('attributes.value', value),
        ...createBetweenFilter('created_date', from, to),
        ...createMetadataFilter(withMetadata),
      },
    };

    const response = await this.CompassProvider.request<PaginatedDropsResponse>(
      PAGINATED_DROPS_QUERY,
      variables,
    );

    const drops = response.drops.map(
      (drop) =>
        new Drop({
          ...drop,
          id: Number(drop.id),
          year: Number(drop.year),
        }),
    );
    return new PaginatedResult<Drop>(drops, drops.length);
  }

  /**
   * Creates a new drop.
   *
   * @async
   * @method
   * @param {CreateDropsInput} input - The input for creating a new drop.
   * @returns {Promise<Drop>} The newly created drop.
   */
  async create(input: CreateDropsInput): Promise<Drop> {
    const repsonse = await this.DropApiProvider.createDrop(input);
    return new Drop(repsonse);
  }

  /**
   * Updates an existing drop.
   *
   * @async
   * @method
   * @param {UpdateDropsInput} input - The input for updating an existing drop.
   * @returns {Promise<Drop>} The updated drop.
   */
  async update(input: UpdateDropsInput): Promise<Drop> {
    const repsonse = await this.DropApiProvider.updateDrop(input);
    return new Drop(repsonse);
  }
}
