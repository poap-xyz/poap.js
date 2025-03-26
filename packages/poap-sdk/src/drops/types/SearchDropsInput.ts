import { PaginationInput } from '@poap-xyz/poap-sdk';

export interface SearchDropsInput extends PaginationInput {
  search: string;
}
