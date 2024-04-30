import { createField } from './field';
import { Order, FieldOrderBy } from '../types/order';

export function createOrderBy<E extends string = string>(
  key: E | undefined,
  value?: Order,
): FieldOrderBy {
  return key && value ? createField<Order>(key, value) : {};
}
