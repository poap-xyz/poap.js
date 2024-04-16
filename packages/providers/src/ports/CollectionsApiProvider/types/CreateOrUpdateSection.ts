import { CreateOrUpdateItem } from './CreateOrUpdateItem';

/**
 * Describes the structure for creating or updating a section within a collection.
 * Sections are identified by an ID and include multiple items (at least 1 and up to 300).
 * The `id` field is nullable, indicating that a new section may be created if `id` is null.
 * The `name` field can be null only if there is exactly one section in the collection; otherwise, it is required.
 */
export interface CreateOrUpdateSection {
  /** Unique identifier for the section, which may be null for new sections. */
  id: string | null;

  /** The name of the section; nullable only if this is the sole section in the collection. */
  name: string | null;

  /** The ordinal position of the section within the collection, starting from 0. Incremental, integer */
  position: number; // minimum: 0

  /** List of items contained within the section, must contain at least 1 and no more than 300 items. */
  items: CreateOrUpdateItem[]; // minItems: 1, maxItems: 300
}
