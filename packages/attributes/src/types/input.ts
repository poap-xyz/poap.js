export interface CreateAttributeInput {
  name: string;
}

export interface FetchAttributesInput {
  limit: number;
  offset: number;
  order: string;
  key?: string;
  value?: string;
  id?: number;
}
