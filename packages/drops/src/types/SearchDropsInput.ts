import { PaginationInput } from '@poap-xyz/utils';

export interface SearchDropsInput extends PaginationInput {
  search: string;
}
