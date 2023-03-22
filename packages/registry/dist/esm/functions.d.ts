import { FetchMetadataInput, FetchVersionPaginatedDropMetadataInput, PaginatedDropsInput, PaginatedMetadataInput } from './types';
export declare function fetchVersionPaginatedDropMetadata({ limit, offset, dropId, }: FetchVersionPaginatedDropMetadataInput): Promise<any>;
export declare function paginatedMetadata({ limit, offset, order, key, value, }: PaginatedMetadataInput): Promise<any>;
export declare function fetchMetadata({ id, }: FetchMetadataInput): Promise<any>;
export declare function paginatedDrops({ limit, offset, order, key, value, name, nameOrder, idOrder, withMetadata, from, to, }: PaginatedDropsInput): Promise<any>;
