import { CollectionBase } from './CollectionBase';
/**
 * Describes the input structure for updating an existing collection.
 *
 * Extends `CollectionBase` to include additional fields necessary for updates, such as `collectionId` and an optional `year`.
 */
export interface PutCollectionsInput extends CollectionBase {
  /** Unique identifier of the collection to be updated. */
  collectionId: number;
}
