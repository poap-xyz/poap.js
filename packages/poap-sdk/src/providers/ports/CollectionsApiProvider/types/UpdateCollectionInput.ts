import { CollectionBase } from './CollectionBase';
/**
 * Describes the input structure for updating an existing collection.
 */
export interface UpdateCollectionInput extends CollectionBase {
  /** Unique identifier of the collection to be updated. */
  collectionId: number;
}
