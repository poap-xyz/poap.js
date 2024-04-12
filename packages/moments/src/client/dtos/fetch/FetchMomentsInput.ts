import { Order, PaginationInput } from '@poap-xyz/utils';

/**
 * Enum to define available fields for sorting Moments.
 *
 * @export
 * @enum {string}
 */
export enum MomentsSortFields {
  StartDate = 'start_date',
  TokenId = 'token_id',
  DropId = 'drop_id',
  Id = 'id',
}

/**
 * Interface representing the input needed to fetch moments.
 * @interface
 * @property {number} limit - The maximum number of moments to fetch.
 * @property {number} offset - The number of moments to skip before starting to fetch.
 * @property {string} [createdOrder] - The order to use for sorting by creation time (optional).
 * @property {string} [tokenIdOrder] - The order to use for sorting by token ID (optional).
 * @property {string} [dropIdOrder] - The order to use for sorting by drop ID (optional).
 * @property {string} [idOrder] - The order to use for sorting by moment ID (optional).
 * @property {string} [author] - The author of the moments to fetch (optional).
 * @property {string} [from] - The start date for filtering moments by creation time (optional).
 * @property {string} [to] - The end date for filtering moments by creation time (optional).
 * @property {string} [id] - The moment ID to fetch (optional).
 * @property {number} [token_id] - The token ID to filter moments by (optional).
 * @property {number} [drop_id] - The drop ID to filter moments by (optional).
 */
export interface FetchMomentsInput extends PaginationInput {
  createdOrder?: Order;
  tokenIdOrder?: Order;
  dropIdOrder?: Order;
  idOrder?: Order;
  author?: string;
  from?: string;
  to?: string;
  id?: string;
  token_id?: number;
  drop_ids?: number[];
}
