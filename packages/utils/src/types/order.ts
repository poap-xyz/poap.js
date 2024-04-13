export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export interface OrderBy {
  [key: string]: Order;
}

export interface OrderByVariables {
  orderBy: OrderBy | Array<OrderBy>;
}
