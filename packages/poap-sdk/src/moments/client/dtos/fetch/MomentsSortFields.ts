/**
 * Enum to define available fields for sorting Moments.
 * 
 * Note: The string values use snake_case as they correspond to 
 * backend API field names, while the enum keys use camelCase
 * to maintain consistency with TypeScript conventions.
 *
 * @export
 * @enum {string}
 */
export enum MomentsSortFields {
  StartDate = 'start_date',
  Id = 'id',
}
