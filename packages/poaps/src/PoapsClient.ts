import { CompassProvider } from '@poap-xyz/providers';
import { POAP } from './domain/Poap';
import { PaginatedPoapsResponse, PAGINATED_POAPS_QUERY } from './queries';
import {
  createBetweenFilter,
  createFilter,
  creatEqFilter,
  createInFilter,
  filterUndefinedProperties,
} from './queries/utils';
import { FetchPoapsInput } from './types';
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
   * @param {FetchPoapsInput} input - The input for fetching drops.
   * @returns {Promise<PaginatedResult<Drop>>} A paginated result of drops.
   */
  async fetch(input: FetchPoapsInput): Promise<PaginatedResult<POAP>> {
    const {
      limit,
      offset,
      order,
      chain,
      collector_address,
      idOrder,
      from,
      to,
      ids,
      drop_id,
    } = input;

    const variables = {
      limit,
      offset,
      orderBy: filterUndefinedProperties({
        minted_on: order,
        id: idOrder,
      }),
      where: {
        ...createFilter('collector_address', collector_address),
        ...creatEqFilter('chain', chain),
        ...creatEqFilter('drop_id', drop_id),
        ...createBetweenFilter('minted_on', from, to),
        ...createInFilter('id', ids),
      },
    };

    const { data } = await this.CompassProvider.request<PaginatedPoapsResponse>(
      PAGINATED_POAPS_QUERY,
      variables,
    );

    const poaps = data.poaps.map((poap) => {
      const { drop } = poap;
      return new POAP({
        ...poap,
        ...drop,
        id: Number(poap.id),
        minted_on: new Date(poap.minted_on),
        drop_id: Number(poap.drop_id),
      });
    });

    return new PaginatedResult<POAP>(
      poaps,
      nextCursor(poaps.length, limit, offset),
    );
  }
}
