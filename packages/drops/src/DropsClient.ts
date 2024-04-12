import {
  CompassProvider,
  DropApiProvider,
  DropResponse as ProviderDropResponse,
} from '@poap-xyz/providers';
import { Drop } from './domain/Drop';
import {
  PAGINATED_DROPS_QUERY,
  PaginatedDropsResponse,
  PaginatedDropsVariables,
} from './queries/PaginatedDrop';
import {
  CreateDropsInput,
  DropImageResponse,
  DropResponse,
  DropsSortFields,
  FetchDropsInput,
  SearchDropsInput,
  UpdateDropsInput,
} from './types';
import {
  PaginatedResult,
  nextCursor,
  createBetweenFilter,
  createInFilter,
  Order,
  isNumeric,
  removeSpecialCharacters,
  createOrderBy,
  createBoolFilter,
  createLikeFilter,
} from '@poap-xyz/utils';
import { DropImage } from './types/dropImage';
import {
  SEARCH_DROPS_QUERY,
  SearchDropsResponse,
  SearchDropsVariables,
} from './queries/SearchDrops';

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
   * @param {CompassProvider} compassProvider - The provider for the POAP compass API.
   * @param {DropApiProvider} dropApiProvider - The provider for the POAP drop API.
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

    const variables: PaginatedDropsVariables = {
      limit,
      offset,
      orderBy: createOrderBy<DropsSortFields>(sortField, sortDir),
      where: {
        ...createBoolFilter('private', isPrivate),
        ...createLikeFilter('name', name),
        ...createBetweenFilter('created_date', from, to),
        ...createInFilter('id', ids),
      },
    };

    const { data } = await this.compassProvider.request<
      PaginatedDropsResponse,
      PaginatedDropsVariables
    >(PAGINATED_DROPS_QUERY, variables);

    const drops = data.drops.map(
      (drop: DropResponse): Drop => this.mapDrop(drop),
    );

    return new PaginatedResult<Drop>(
      drops,
      nextCursor(drops.length, limit, offset),
    );
  }

  /**
   * Searches drops based on the specified input.
   *
   * @async
   * @method
   * @param {SearchDropsInput} input - The input for searching drops.
   * @returns {Promise<PaginatedResult<Drop>>} A paginated result of drops.
   */
  async search(input: SearchDropsInput): Promise<PaginatedResult<Drop>> {
    const { search, offset, limit } = input;

    if (!search) {
      return new PaginatedResult<Drop>([], null);
    }

    const variables: SearchDropsVariables = {
      limit,
      offset,
      ...(isNumeric(search) && { orderBy: { id: Order.ASC } }),
      args: {
        search: removeSpecialCharacters(search),
      },
    };

    const { data } = await this.compassProvider.request<
      SearchDropsResponse,
      SearchDropsVariables
    >(SEARCH_DROPS_QUERY, variables);

    const drops = data.search_drops.map(
      (drop: DropResponse): Drop => this.mapDrop(drop),
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

  private formatDrop(drop: ProviderDropResponse): Drop {
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
      originalImageUrl: drop.image_url,
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
      emailReservationCount: 0,
    });
  }

  private computeDropImages(drop: DropResponse): {
    imageUrl: string;
    originalImageUrl: string;
  } {
    const dropImage = this.mapDropImage(drop.drop_image);
    return {
      imageUrl: dropImage?.crop || drop.image_url,
      originalImageUrl: dropImage?.original || drop.image_url,
    };
  }

  private mapDropImage(response?: DropImageResponse): DropImage | undefined {
    if (!response) return response;

    const images = response.gateways.reduce(
      (acc, gateway) => ({ ...acc, [gateway.type.toLowerCase()]: gateway.url }),
      {},
    );

    return { ...images };
  }

  private mapDrop(drop: DropResponse): Drop {
    const { imageUrl, originalImageUrl } = this.computeDropImages(drop);

    return new Drop({
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
      imageUrl,
      originalImageUrl,
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
      emailReservationCount: drop.email_claims_stats
        ? Number(drop.email_claims_stats.total)
        : 0,
      expiryDate: new Date(drop.expiry_date),
      endDate: new Date(drop.end_date),
    });
  }
}
