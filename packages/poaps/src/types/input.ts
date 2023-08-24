import { Order, Chain, PaginationInput, Status } from '@poap-xyz/utils';

export enum PoapsSortFields {
  MintedOn = 'minted_on',
  Id = 'id',
}

export interface FetchPoapsInput extends PaginationInput {
  name?: string;
  chain?: Chain;
  minted_date_from?: string;
  minted_date_to?: string;
  ids?: number[];
  collector_address?: string;
  drop_id?: number;
  sort_field?: PoapsSortFields;
  sort_dir?: Order;
  filter_by_zero_address?: boolean;
}

export interface claimtInput {
  qr_hash: string;
  benificiary: string;
  sendEmail?: boolean;
  onStatusUpdate?: (status: Status) => void | Promise<void>;
}
