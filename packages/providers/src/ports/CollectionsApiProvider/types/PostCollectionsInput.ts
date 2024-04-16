import { CollectionBase } from './CollectionBase';

/**
 * Describes the input structure for creating a new collection.
 *
 * Extends `CollectionBase` to include properties unique to the creation of a collection, such as `year` and `ownerAddress`.
 */
export interface PostCollectionsInput extends CollectionBase {
  /** Ethereum address of the collection's owner. Must be a valid address. */
  ownerAddress: string;
}
