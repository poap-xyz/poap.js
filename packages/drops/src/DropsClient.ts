import {
  CompassProvider,
  DropApiProvider,
  DropResponse,
} from '@poap-xyz/providers';
import { Drop } from './domain/Drop';
import { PaginatedDropsResponse, PAGINATED_DROPS_QUERY } from './queries';
import {
  createBetweenFilter,
  createFilter,
  createInFilter,
  filterUndefinedProperties,
} from './queries/utils';
import { CreateDropsInput, FetchDropsInput, UpdateDropsInput } from './types';
import { PaginatedResult, nextCursor } from '@poap-xyz/utils';

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
    const { limit, offset, name, sort_field, sort_dir, from, to, ids } = input;

    const variables = {
      limit,
      offset,
      orderBy: filterUndefinedProperties({
        [`${sort_field}`]: sort_dir,
      }),
      where: {
        private: { _eq: false },
        ...createFilter('name', name),
        ...createBetweenFilter('created_date', from, to),
        ...createInFilter('id', ids),
      },
    };

    const { data } = await this.CompassProvider.request<PaginatedDropsResponse>(
      PAGINATED_DROPS_QUERY,
      variables,
    );

    const drops = data.drops.map(
      (drop) =>
        new Drop({
          ...drop,
          id: Number(drop.id),
          year: Number(drop.year),
          poap_count: drop.stats_by_chain_aggregate.aggregate.sum
            ? Number(drop.stats_by_chain_aggregate.aggregate.sum.poap_count)
            : 0,
          transfer_count: drop.stats_by_chain_aggregate.aggregate.sum
            ? Number(drop.stats_by_chain_aggregate.aggregate.sum.transfer_count)
            : 0,
          email_claim: drop.email_claims_stats
            ? Number(drop.email_claims_stats.total)
            : 0,
          start_date: new Date(drop.start_date),
          end_date: new Date(drop.end_date),
          created_date: new Date(drop.created_date),
          expiry_date: new Date(drop.expiry_date),
        }),
    );

    return new PaginatedResult<Drop>(
      drops,
      nextCursor(drops.length, limit, offset),
    );
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
    return this.formatDrop(repsonse);
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
    return this.formatDrop(repsonse);
  }

  private formatDrop(drop: DropResponse): Drop {
    return new Drop({
      id: drop.id,
      fancy_id: drop.fancy_id,
      name: drop.name,
      description: drop.description,
      city: drop.city,
      country: drop.country,
      channel: drop.channel,
      platform: drop.platform,
      location_type: drop.location_type,
      drop_url: drop.event_url,
      image_url: drop.image_url,
      animation_url: drop.animation_url,
      year: drop.year,
      start_date: new Date(drop.start_date),
      timezone: drop.timezone,
      private: drop.private_event,
      created_date: new Date(drop.created_date),
      expiry_date: new Date(drop.expiry_date),
      end_date: new Date(drop.end_date),
      transfer_count: 0,
      poap_count: 0,
      email_claim: 0,
    });
  }
}
