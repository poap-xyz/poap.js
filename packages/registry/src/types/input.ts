export interface FetchVersionPaginatedDropAttributeInput {
  limit: number;
  offset: number;
  dropId: number;
}

export interface PaginatedAttributeInput {
  limit: number;
  offset: number;
  order: string;
  key: string;
  value: string;
}

export interface FetchAttributeInput {
  id: number;
}
