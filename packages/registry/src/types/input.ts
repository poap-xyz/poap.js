export interface FetchVersionPaginatedDropMetadataInput {
  limit: number;
  offset: number;
  dropId: number;
}

export interface PaginatedMetadataInput {
  limit: number;
  offset: number;
  order: string;
  key: string;
  value: string;
}

export interface FetchMetadataInput {
  id: number;
}
