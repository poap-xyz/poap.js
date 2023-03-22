import {
  fetchVersionPaginatedDropMetadata,
  paginatedMetadata,
  fetchMetadata,
} from './functions';
import {
  FetchMetadataInput,
  FetchVersionPaginatedDropMetadataInput,
  PaginatedMetadataInput,
} from './types';

export class RegistryApiClient {
  constructor(apiKey: string) {}

  async fetchVersionPaginatedDropMetadata(
    input: FetchVersionPaginatedDropMetadataInput
  ): Promise<any> {
    return fetchVersionPaginatedDropMetadata(input);
  }

  async paginatedMetadata(
    input: PaginatedMetadataInput
  ): Promise<any> {
    return paginatedMetadata(input);
  }

  async fetchMetadata(
    input: FetchMetadataInput
  ): Promise<any> {
    return fetchMetadata(input);
  }
}
