/**
 * Sorting order.
 */
export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export interface OrderBy {
  [key: string]: Order;
}

/**
 * Order by query variables.
 */
export interface OrderByVariables {
  orderBy: OrderBy | Array<OrderBy>;
}
