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

export function creatUndefinedOrder(
  key: string | undefined,
  value?: string | undefined,
): Record<string, any> {
  return key && value ? { [key]: value } : {};
}

export function createFilter(key: string, value?: string): Record<string, any> {
  return value ? { [key]: { _ilike: `%${value}%` } } : {};
}

export function creatEqFilter(
  key: string,
  value?: string | number,
): Record<string, any> {
  return value ? { [key]: { _eq: value } } : {};
}

export function creatNeqFilter(
  key: string,
  value?: string | number,
): Record<string, any> {
  return value ? { [key]: { _neq: value } } : {};
}

export function creatPrivateFilter(
  key: string,
  value?: boolean,
): Record<string, any> {
  return typeof value === 'boolean'
    ? { [key]: { _eq: value ? 'true' : 'false' } }
    : {};
}

export function filterZeroAddress(filter: boolean): Record<string, any> {
  return filter ? { _neq: '0x0000000000000000000000000000000000000000' } : {};
}

export function creatAddressFilter(
  key: string,
  filter: boolean,
  value?: string,
): Record<string, any> {
  const addressFilter = {
    [key]: {
      ...filterZeroAddress(filter),
    },
  };

  if (value) {
    addressFilter[key]._eq = value.toLocaleLowerCase();
  }
  return filter || value ? addressFilter : {};
}

export function createInFilter(
  key: string,
  values?: Array<string | number>,
): Record<string, any> {
  return values && values.length ? { [key]: { _in: values } } : {};
}

export function createBetweenFilter(
  key: string,
  from?: string,
  to?: string,
): Record<string, any> {
  const dateFilter: { _gte?: string; _lte?: string } = {};
  if (from) {
    dateFilter._gte = from;
  }
  if (to) {
    dateFilter._lte = to;
  }
  return from || to ? { [key]: dateFilter } : {};
}
