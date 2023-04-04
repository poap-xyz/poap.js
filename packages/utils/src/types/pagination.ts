/**
 * Represents a paginated result.
 *
 * @class PaginatedResult
 * @template T
 */
export class PaginatedResult<T> {
  /**
   * An array of items in the current page of the result.
   *
   * @member {T[]}
   * @name PaginatedResult#items
   */
  items: T[];

  /**
   * The cursor for the next page of the result, or null if there are no more pages.
   *
   * @member {string|number|null}
   * @name PaginatedResult#nextCursor
   */
  nextCursor: string | number | null;

  /**
   * Creates a new PaginatedResult object.
   *
   * @constructor
   * @param {T[]} items - The items in the current page of the result.
   * @param {string|number|null} nextCursor - The cursor for the next page of the result, or null if there are no more pages.
   */
  constructor(items: T[], nextCursor: string | number | null) {
    this.items = items;
    this.nextCursor = nextCursor;
  }
}
