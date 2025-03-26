import { PaginationInput } from '@poap-xyz/poap-sdk/utils';

export interface SearchDropsInput extends PaginationInput {
  search: string;
}
