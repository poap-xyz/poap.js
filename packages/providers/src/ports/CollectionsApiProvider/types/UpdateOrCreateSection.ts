import { UpdateOrCreateItem } from './UpdateOrCreateItem';
/**
 * Describes the structure for creating or updating a section within a collection.
 *
 * This includes the section's identifier, name, position, and the items that it contains.
 * The `id` field is nullable, indicating that a new section may be created if `id` is null.
 */
export interface UpdateOrCreateSection {
  id: string | null;
  name: string | null;
  position: number;
  items: UpdateOrCreateItem[];
}
