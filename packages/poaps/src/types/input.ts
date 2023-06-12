import { Order } from '@poap-xyz/utils';

export interface FetchPoapsInput {
  limit: number;
  offset: number;
  minted_on_order?: Order;
  name?: string;
  chain?: string;
  id_order?: Order;
  minted_date_from?: string;
  minted_date_to?: string;
  ids?: number[];
  collector_address?: string;
  drop_id?: number;
}
