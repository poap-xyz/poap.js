/**
 * Sorting order.
 */
export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export interface FieldOrderBy {
  [key: string]: Order;
}

export type OrderBy =
  | FieldOrderBy
  | { [key: string]: FieldOrderBy }
  | Array<OrderBy>;

/**
 * Order by query variables.
 */
export interface OrderByVariables {
  orderBy: OrderBy;
}
