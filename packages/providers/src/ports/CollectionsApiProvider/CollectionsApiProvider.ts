import { PutCollectionsInput } from './types/PutCollectionsInput';
import { CollectionResponse } from './types/CollectionResponse';
import { PostCollectionsInput } from './types/PostCollectionsInput';

/**
 * The `CollectionsApiProvider` interface defines the contract for an API provider
 * that interacts with a collections API. Implementations of this interface are expected
 * to provide methods for posting new collections and updating existing collections,
 * using the POAP (Proof of Attendance Protocol) Collections API or a similar API.
 *
 * @interface CollectionsApiProvider
 */
export interface CollectionsApiProvider {
  /**
   * Posts a new collection to the API.
   *
   * This method is responsible for creating a new collection entity in the database
   * or storage being used, based on the provided collection data and access token for
   * authorization.
   *
   * @param {PostCollectionsInput} postCollectionsInput - The data for the collection to be created.
   * @param {string} accessToken - The access token used for authorization in the API request.
   * @returns {Promise<CollectionResponse>} A promise that resolves with the response data
   * of the newly created collection.
   */
  postCollection(
    postCollectionsInput: PostCollectionsInput,
    accessToken: string,
  ): Promise<CollectionResponse>;

  /**
   * Applies updates to an existing collection in the API.
   *
   * This method is intended for updating the details of an existing collection,
   * such as its name, description, or any other mutable property, based on the
   * provided put data and access token for authorization.
   *
   * @param {PutCollectionsInput} putCollectionsInput - The put data for updating the collection,
   * including the ID of the collection to update.
   * @param {string} accessToken - The access token used for authorization in the API request.
   * @returns {Promise<CollectionResponse>} A promise that resolves with the response data
   * of the updated collection.
   */
  putCollection(
    putCollectionsInput: PutCollectionsInput,
    accessToken: string,
  ): Promise<CollectionResponse>;
}
