import { Order, PaginationInput } from '@poap-xyz/poap-sdk';
import { DropsSortFields } from './DropsSortFields';

export type FetchDropsInput = PaginationInput & {
  sortField?: DropsSortFields;
  sortDir?: Order;
  /** Drop event start date to start from the given date. */
  from?: string;
  /** Drop event start date to end on or before the given date. */
  to?: string;
  /** List of drop IDs to filter the drops. */
  ids?: number[];
};
