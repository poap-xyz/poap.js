/**
 * Sorting order.
 */
export enum Order {
  ASC = 'asc',
  DESC = 'desc',
  ASC_NULLS_FIRST = 'asc_nulls_first',
  ASC_NULLS_LAST = 'asc_nulls_last',
  DESC_NULLS_FIRST = 'desc_nulls_first',
  DESC_NULLS_LAST = 'desc_nulls_last',
}

export type FieldOrderBy = { [key: string]: FieldOrderBy | Order };

export type OrderBy = FieldOrderBy | Array<FieldOrderBy>;

/**
 * Order by query variables.
 */
export interface OrderByVariables {
  orderBy: OrderBy;
}
