import { CompassProvider } from '@poap-xyz/providers';
import { POAP } from './domain/Poap';
import { PaginatedPoapsResponse, PAGINATED_POAPS_QUERY } from './queries';
import {
  createBetweenFilter,
  createFilter,
  createInFilter,
  filterUndefinedProperties,
} from './queries/utils';
import { FetchDropsInput } from './types';
import { PaginatedResult, nextCursor } from '@poap-xyz/utils';

/**
 * Represents a client for working with POAP drops.
 *
 * @class DropsClient
 */
export class PoapsClient {
  /**
   * Creates a new DropsClient object.
   *
   * @constructor
   * @param {CompassProvider} CompassProvider - The provider for the POAP compass API.
   */
  constructor(private CompassProvider: CompassProvider) {}

  /**
   * Fetches drops based on the specified input.
   *
   * @async
   * @method
   * @param {FetchDropsInput} input - The input for fetching drops.
   * @returns {Promise<PaginatedResult<Drop>>} A paginated result of drops.
   */
  async fetch(input: FetchDropsInput): Promise<PaginatedResult<POAP>> {
    const { limit, offset, order, name, nameOrder, idOrder, from, to, ids } =
      input;

    const variables = {
      limit,
      offset,
      orderBy: filterUndefinedProperties({
        start_date: order,
        name: nameOrder,
        id: idOrder,
      }),
      where: {
        ...createFilter('name', name),
        ...createBetweenFilter('created_date', from, to),
        ...createInFilter('id', ids),
      },
    };

    const { data } = await this.CompassProvider.request<PaginatedPoapsResponse>(
      PAGINATED_POAPS_QUERY,
      variables,
    );

    const poaps = data.poaps.map(
      (poap) =>
        new POAP({
          ...poap,
          id: Number(poap.id),
          minted_on: new Date(poap.minted_on),
          drop_id: Number(poap.drop_id),
        }),
    );

    return new PaginatedResult<POAP>(
      poaps,
      nextCursor(poaps.length, limit, offset),
    );
  }
}
