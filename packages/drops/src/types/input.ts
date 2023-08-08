import { Order, PaginationInput } from '@poap-xyz/utils';

export enum DropsSortFields {
  Name = 'name',
  Id = 'id',
  StartDate = 'start_date',
}

export interface FetchDropsInput extends PaginationInput {
  name?: string;
  sort_field?: DropsSortFields;
  sort_dir?: Order;
  from?: string;
  to?: string;
  ids?: number[];
  is_private?: boolean;
}

export interface CreateDropsInput {
  name: string;
  description: string;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  expiry_date: string;
  event_url: string;
  virtual_event: boolean;
  image: Buffer;
  filename: string;
  contentType: string;
  secret_code: string;
  event_template_id?: number | null;
  email: string;
  requested_codes?: number;
  private_event?: boolean;
}

export type UpdateDropsInput = CreateDropsInput;
