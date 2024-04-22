/**
 * Sorting order.
 */
export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export type FieldOrderBy = { [key: string]: FieldOrderBy | Order };

export type OrderBy = FieldOrderBy | Array<FieldOrderBy>;

/**
 * Order by query variables.
 */
export interface OrderByVariables {
  orderBy: OrderBy;
}
