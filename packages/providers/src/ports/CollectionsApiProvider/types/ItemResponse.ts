/**
 * Defines the structure for an item response related to a collection or drop.
 *
 * This includes the item's identifier, the collection it belongs to, the drop identifier,
 * and the curator's information. It is typically used in the context of displaying or managing
 * individual items within collections.
 */
export interface ItemResponse {
  id: number;
  dropId: number;
  collectionId: number;
  curatedBy: string;
}
