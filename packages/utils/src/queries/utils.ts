import { Order } from '../types/order';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function filterUndefinedProperties<T extends Record<string, any>>(
  obj: T,
): Partial<T> {
  const filteredObj: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
}

export function createOrderBy<E extends string = string>(
  key: E | undefined,
  value?: Order | undefined,
): { [key: string]: Order } {
  return key && value ? { [key]: value } : {};
}
