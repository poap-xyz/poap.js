import { Order, PaginationInput } from '@poap-xyz/poap-sdk';
import { DropsSortFields } from './DropsSortFields';

export interface FetchDropsInput extends PaginationInput {
  name?: string;
  sortField?: DropsSortFields;
  sortDir?: Order;
  from?: string;
  to?: string;
  ids?: number[];
  isPrivate?: boolean;
}
