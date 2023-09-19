import {
  CompassProvider,
  DropApiProvider,
  DropResponse,
} from '@poap-xyz/providers';
import { Drop } from './domain/Drop';
import { PaginatedDropsResponse, PAGINATED_DROPS_QUERY } from './queries';
import { CreateDropsInput, FetchDropsInput, UpdateDropsInput } from './types';
import {
  PaginatedResult,
  nextCursor,
  creatPrivateFilter,
  createUndefinedOrder,
  createBetweenFilter,
  createFilter,
  createInFilter,
} from '@poap-xyz/utils';

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
    private compassProvider: CompassProvider,
    private dropApiProvider: DropApiProvider,
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
      name,
      sortField,
      sortDir,
      from,
      to,
      ids,
      isPrivate,
    } = input;

    const variables = {
      limit,
      offset,
      orderBy: createUndefinedOrder(sortField, sortDir),
      where: {
        ...creatPrivateFilter('private', isPrivate),
        ...createFilter('name', name),
        ...createBetweenFilter('created_date', from, to),
        ...createInFilter('id', ids),
      },
    };

    const { data } = await this.compassProvider.request<PaginatedDropsResponse>(
      PAGINATED_DROPS_QUERY,
      variables,
    );

    const drops = data.drops.map(
      (drop) =>
        new Drop({
          id: Number(drop.id),
          fancyId: drop.fancy_id,
          name: drop.name,
          description: drop.description,
          city: drop.city,
          country: drop.country,
          channel: drop.channel,
          platform: drop.platform,
          locationType: drop.location_type,
          dropUrl: drop.drop_url,
          imageUrl: drop.image_url,
          animationUrl: drop.animation_url,
          year: Number(drop.year),
          startDate: new Date(drop.start_date),
          timezone: drop.timezone,
          private: drop.private,
          createdDate: new Date(drop.created_date),
          poapCount: drop.stats_by_chain_aggregate.aggregate.sum
            ? Number(drop.stats_by_chain_aggregate.aggregate.sum.poap_count)
            : 0,
          transferCount: drop.stats_by_chain_aggregate.aggregate.sum
            ? Number(drop.stats_by_chain_aggregate.aggregate.sum.transfer_count)
            : 0,
          emailClaim: drop.email_claims_stats
            ? Number(drop.email_claims_stats.total)
            : 0,
          expiryDate: new Date(drop.expiry_date),
          endDate: new Date(drop.end_date),
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
    const repsonse = await this.dropApiProvider.createDrop({
      name: input.name,
      description: input.description,
      city: input.city,
      country: input.country,
      start_date: input.startDate,
      end_date: input.endDate,
      expiry_date: input.expiryDate,
      event_url: input.eventUrl,
      virtual_event: input.virtualEvent,
      image: input.image,
      filename: input.filename,
      contentType: input.contentType,
      secret_code: input.secretCode,
      event_template_id: input.eventTemplateId,
      email: input.email,
      requested_codes: input.requestedCodes,
      private_event: input.privateEvent,
    });
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
    const repsonse = await this.dropApiProvider.updateDrop({
      name: input.name,
      description: input.description,
      country: input.country,
      city: input.city,
      start_date: input.startDate,
      end_date: input.endDate,
      expiry_date: input.expiryDate,
      event_url: input.eventUrl,
      virtual_event: input.virtualEvent,
      private_event: input.privateEvent,
      event_template_id: input.eventTemplateId,
      secret_code: input.secretCode,
    });
    return this.formatDrop(repsonse);
  }

  private formatDrop(drop: DropResponse): Drop {
    return new Drop({
      id: drop.id,
      fancyId: drop.fancy_id,
      name: drop.name,
      description: drop.description,
      city: drop.city,
      country: drop.country,
      channel: drop.channel,
      platform: drop.platform,
      locationType: drop.location_type,
      dropUrl: drop.event_url,
      imageUrl: drop.image_url,
      animationUrl: drop.animation_url,
      year: drop.year,
      startDate: new Date(drop.start_date),
      timezone: drop.timezone,
      private: drop.private_event,
      createdDate: new Date(drop.created_date),
      expiryDate: new Date(drop.expiry_date),
      endDate: new Date(drop.end_date),
      transferCount: 0,
      poapCount: 0,
      emailClaim: 0,
    });
  }
}
