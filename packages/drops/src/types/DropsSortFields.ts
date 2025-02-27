/**
 * Enum to define available fields for sorting Drops.
 * 
 * Note: The string values use snake_case as they correspond to 
 * backend API field names, while the enum keys use camelCase
 * to maintain consistency with TypeScript conventions.
 *
 * @export
 * @enum {string}
 */
export enum DropsSortFields {
  Name = 'name',
  Id = 'id',
  StartDate = 'start_date',
}
