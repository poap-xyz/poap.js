import { Order } from '../types/order';

export function createOrderBy<E extends string = string>(
  key: E | undefined,
  value?: Order | undefined,
): { [key: string]: Order } {
  return key && value ? { [key]: value } : {};
}
