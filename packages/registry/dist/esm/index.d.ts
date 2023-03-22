import { FetchMetadataInput, FetchVersionPaginatedDropMetadataInput, PaginatedDropsInput, PaginatedMetadataInput } from './types';
export declare class RegistryApiClient {
    constructor(apiKey: string);
    fetchVersionPaginatedDropMetadata(input: FetchVersionPaginatedDropMetadataInput): Promise<any>;
    paginatedMetadata(input: PaginatedMetadataInput): Promise<any>;
    fetchMetadata(input: FetchMetadataInput): Promise<any>;
    paginatedDrops(input: PaginatedDropsInput): Promise<any>;
}
