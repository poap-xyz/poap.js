import { ItemResponse } from './ItemResponse';
/**
 * Represents the structure for a section within a collection.
 *
 * Each section may contain multiple items and is identified by a unique string (UUID).
 * It also includes the section's name, its position within the collection, the collection
 * identifier, and the items within the section.
 */
export interface SectionResponse {
  id: string;
  name: string | null;
  position: number;
  collectionId: number;
  items: ItemResponse[];
}
