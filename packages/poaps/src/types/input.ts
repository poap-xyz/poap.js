import { Order } from '@poap-xyz/utils';

export enum PoapsSortFields {
  MintedOn = 'minted_on',
  Id = 'id',
}

export interface FetchPoapsInput {
  limit: number;
  offset: number;
  name?: string;
  chain?: string;
  minted_date_from?: string;
  minted_date_to?: string;
  ids?: number[];
  collector_address?: string;
  drop_id?: number;
  sort_field?: PoapsSortFields;
  sort_order?: Order;
}
