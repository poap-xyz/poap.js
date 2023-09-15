import { Order, PaginationInput } from '@poap-xyz/utils';

export enum DropsSortFields {
  Name = 'name',
  Id = 'id',
  StartDate = 'start_date',
}

export interface FetchDropsInput extends PaginationInput {
  name?: string;
  sortField?: DropsSortFields;
  sortDir?: Order;
  from?: string;
  to?: string;
  ids?: number[];
  isPrivate?: boolean;
}

export interface CreateDropsInput {
  name: string;
  description: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  expiryDate: string;
  eventUrl: string;
  virtualEvent: boolean;
  image: Buffer;
  filename: string;
  contentType: string;
  secretCode: string;
  eventTemplateId?: number | null;
  email: string;
  requestedCodes?: number;
  privateEvent?: boolean;
}

export type UpdateDropsInput = CreateDropsInput;
