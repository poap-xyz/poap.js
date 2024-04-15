import { Order, OrderBy } from '../types/order';

export function createOrderBy<E extends string = string>(
  key: E | undefined,
  value?: Order | undefined,
): OrderBy {
  return key && value ? { [key]: value } : {};
}
