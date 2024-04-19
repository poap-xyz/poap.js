import { Order, FieldOrderBy } from '../types/order';

export function createOrderBy<E extends string = string>(
  key: E | undefined,
  value?: Order | undefined,
): FieldOrderBy {
  return key && value ? { [key]: value } : {};
}
