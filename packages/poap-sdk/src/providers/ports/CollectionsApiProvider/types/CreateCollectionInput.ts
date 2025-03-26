import { CollectionBase } from './CollectionBase';

/**
 * Describes the input structure for creating a new collection.
 */
export interface CreateCollectionInput extends CollectionBase {
  /** Ethereum address of the collection's owner. Must be a valid address. */
  ownerAddress: string;
}
