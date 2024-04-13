export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export interface OrderByVariables {
  orderBy: { [key: string]: Order } | Array<{ [key: string]: Order }>;
}
