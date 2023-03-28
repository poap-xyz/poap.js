export interface FetchVersionDropAttributeInput {
  limit: number;
  offset: number;
  dropId: number;
}

export interface FetchAttributesInput {
  limit: number;
  offset: number;
  order: string;
  key: string;
  value: string;
}

export interface FetchAttributeInput {
  id: number;
}
