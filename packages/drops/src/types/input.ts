export interface FetchDropsInput {
  limit: number;
  offset: number;
  order: string;
  key: string;
  value: string;
  name: string;
  nameOrder: string;
  idOrder: string;
  withMetadata: string;
  from: string;
  to: string;
}
