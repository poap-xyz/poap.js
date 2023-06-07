export interface FetchPoapsInput {
  limit: number;
  offset: number;
  order?: string;
  name?: string;
  chain?: string;
  idOrder?: string;
  from?: string;
  to?: string;
  ids?: number[];
  collector_address?: string;
  drop_id?: number;
}
