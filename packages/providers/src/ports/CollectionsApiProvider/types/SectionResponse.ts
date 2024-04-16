import { ItemResponse } from './ItemResponse';

/**
 * Represents the structure for a section within a collection.
 * Each section contains multiple items and is uniquely identified by a string ID.
 * The name of the section can be null if there is exactly one section in the collection; otherwise, it is required.
 * Includes the section's name (if applicable), its position within the collection, and the list of items.
 */
export interface SectionResponse {
  /** Unique identifier for the section (typically a UUID). */
  id: string;

  /** The name of the section, which can be null only if this is the sole section in the collection. */
  name: string | null;

  /** The ordinal position of the section within the collection, starting from 0. Incremental, integer */
  position: number; // minimum: 0

  /** Identifier of the collection to which the section belongs, must be a positive integer. */
  collectionId: number; // minimum: 1

  /** List of item responses contained within the section, must contain at least one item. */
  items: ItemResponse[]; // minItems: 1
}
