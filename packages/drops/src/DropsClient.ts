import { CompassProvider, DropApiProvider } from '@poap-xyz/providers';
import {
  createBetweenFilter,
  createBoolFilter,
  createInFilter,
  createLikeFilter,
  createOrderBy,
  isNumeric,
  nextCursor,
  Order,
  PaginatedResult,
  toPOAPDate,
} from '@poap-xyz/utils';
import { Drop } from './domain/Drop';
import {
  PAGINATED_DROPS_QUERY,
  PaginatedDropsResponse,
  PaginatedDropsVariables,
} from './queries/PaginatedDrop';
import {
  SEARCH_DROPS_QUERY,
  SearchDropsResponse,
  SearchDropsVariables,
} from './queries/SearchDrops';
import { DropResponse } from './types/DropResponse';
import { DropsSortFields } from './types/DropsSortFields';
import { CreateDropsInput } from './types/CreateDropsInput';
import { UpdateDropsInput } from './types/UpdateDropsInput';
import { FetchDropsInput } from './types/FetchDropsInput';
import { SearchDropsInput } from './types/SearchDropsInput';

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
      (drop: DropResponse): Drop => Drop.fromCompass(drop),
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
        search,
      },
    };

    const { data } = await this.compassProvider.request<
      SearchDropsResponse,
      SearchDropsVariables
    >(SEARCH_DROPS_QUERY, variables);

    const drops = data.search_drops.map(
      (drop: DropResponse): Drop => Drop.fromCompass(drop),
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
      start_date:
        input.startDate instanceof Date
          ? toPOAPDate(input.startDate)
          : input.startDate,
      end_date:
        input.endDate instanceof Date
          ? toPOAPDate(input.endDate)
          : input.endDate,
      expiry_date:
        input.expiryDate instanceof Date
          ? toPOAPDate(input.expiryDate)
          : input.expiryDate,
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
    return Drop.fromProvider(repsonse);
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
    return Drop.fromProvider(repsonse);
  }
}
