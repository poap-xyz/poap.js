import { PaginationInput } from '@poap-sdk/utils';

export interface SearchDropsInput extends PaginationInput {
  search: string;
}
