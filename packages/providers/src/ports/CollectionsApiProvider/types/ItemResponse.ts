/**
 * Defines the structure for an item response related to a collection or drop.
 */
export interface ItemResponse {
  /** Unique identifier for the item, must be a positive integer. */
  id: number; // minimum: 1

  /** Identifier of the drop associated with the item, must be a positive integer. */
  dropId: number; // minimum: 1

  /** Identifier of the collection that contains the item, must be a positive integer. */
  collectionId: number; // minimum: 1
}
