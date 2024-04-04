import { PostCollectionsInput } from './../../ports/CollectionsApiProvider/types/PostCollectionsInput';
import { CollectionResponse } from './../../ports/CollectionsApiProvider/types/CollectionResponse';
import { PatchCollectionsInput } from './../../ports/CollectionsApiProvider/types/PatchCollectionsInput';
import { CollectionsApiProvider } from './../../ports/CollectionsApiProvider/CollectionsApiProvider';

const DEFAULT_COLLECTIONS_BASE_URL = 'https://collections.poap.tech';
/**
 * The `PoapCollectionsApi` class provides methods to interact with the POAP Collections API,
 * allowing for the creation and modification of POAP collections.
 *
 * It requires an authToken for authorization and uses a provided or default base URL for API requests.
 *
 * @class PoapCollectionsApi
 * @implements {CollectionsApiProvider}
 */
export class PoapCollectionsApi implements CollectionsApiProvider {
  private baseUrl: string;

  /**
   * Creates an instance of PoapCollectionsApi.
   *
   * @constructor
   * @param {string} [baseUrl='https://collections.poap.tech'] - The base URL for the Collections API.
   * If not provided, a default URL is used.
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl || DEFAULT_COLLECTIONS_BASE_URL;
  }

  /**
   * Posts a new collection to the POAP Collections API.
   *
   * @public
   * @async
   * @param {PostCollectionsInput} postCollectionsInput - The collection data to be posted.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<CollectionResponse>} A promise that resolves with the collection response from the API.
   */
  public async postCollection(
    postCollectionsInput: PostCollectionsInput,
    accessToken: string,
  ): Promise<CollectionResponse> {
    return await this.secureFetch<CollectionResponse>(
      `${this.baseUrl}/collections`,
      {
        method: 'POST',
        body: JSON.stringify(postCollectionsInput),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      accessToken,
    );
  }

  /**
   * Applies a patch to an existing collection in the POAP Collections API.
   *
   * @public
   * @async
   * @param {PatchCollectionsInput} patchCollectionsInput - The patch data and collection ID.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<CollectionResponse>} A promise that resolves with the updated collection response from the API.
   */
  public async patchCollection(
    patchCollectionsInput: PatchCollectionsInput,
    accessToken: string,
  ): Promise<CollectionResponse> {
    return await this.secureFetch<CollectionResponse>(
      `${this.baseUrl}/collections/${patchCollectionsInput.collectionId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(patchCollectionsInput),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      accessToken,
    );
  }

  /**
   * Sends a secure HTTP request to the POAP Collections API.
   *
   * This method is used internally by `postCollection` and `patchCollection` to send HTTP requests.
   *
   * @private
   * @async
   * @param {string} url - The URL for the HTTP request.
   * @param {RequestInit} options - The options for the HTTP request, including method and body.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<R>} A promise that resolves with the response from the API.
   */
  private async secureFetch<R>(
    url: string,
    options: RequestInit,
    accessToken: string,
  ): Promise<R> {
    const headersWithApiKey = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(url, {
      method: options.method,
      body: options.body,
      headers: headersWithApiKey,
    });

    return await response.json();
  }
}
