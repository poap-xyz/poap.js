/**
 * Represents the structure for creating or updating an item within a section.
 */
export interface CreateOrUpdateItem {
  /** The position of the item within the section, starting from 1. */
  position: number; // minimum: 1

  /** The identifier of the drop associated with the item, must be a positive integer. */
  dropId: number; // minimum: 1
}
