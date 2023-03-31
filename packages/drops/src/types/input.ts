import { DropProperties } from './../domain/Drop';

export interface FetchDropsInput {
  limit: number;
  offset: number;
  order?: string;
  key?: string;
  value?: string;
  name?: string;
  nameOrder?: string;
  idOrder?: string;
  withMetadata?: string;
  from?: string;
  to?: string;
}

export interface CreateDropsInput extends DropProperties {
  email: string;
  image: string;
  secret_code: string;
}

export type UpdateDropsInput = CreateDropsInput;
