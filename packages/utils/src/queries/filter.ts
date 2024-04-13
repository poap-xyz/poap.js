import {
  EqFilter,
  FieldFilter,
  GteFilter,
  InFilter,
  LikeFilter,
  LteFilter,
  NeqFilter,
  NinFilter,
} from '../types/filter';

export function createLikeFilter(
  key: string,
  value?: string,
): FieldFilter<LikeFilter> {
  return value ? { [key]: { _ilike: `%${value}%` } } : {};
}

export function createEqFilter(
  key: string,
  value?: string | number,
): FieldFilter<EqFilter> {
  return value ? { [key]: { _eq: value } } : {};
}

export function createNeqFilter(
  key: string,
  value?: string | number,
): FieldFilter<NeqFilter> {
  return value ? { [key]: { _neq: value } } : {};
}

export function createBoolFilter(
  key: string,
  value?: boolean,
): FieldFilter<EqFilter<'true' | 'false'>> {
  return typeof value === 'boolean'
    ? { [key]: { _eq: value ? 'true' : 'false' } }
    : {};
}

export function createAddressFilter(
  key: string,
  filterZeroAddress: boolean,
  value?: string,
): FieldFilter<Partial<EqFilter> & Partial<NeqFilter>> {
  return filterZeroAddress || value
    ? {
        [key]: {
          ...(filterZeroAddress
            ? { _neq: '0x0000000000000000000000000000000000000000' }
            : {}),
          ...(value ? { _eq: value.toLowerCase() } : {}),
        },
      }
    : {};
}

export function createInFilter(
  key: string,
  values?: Array<string | number | boolean>,
): FieldFilter<InFilter> {
  return values && values.length ? { [key]: { _in: values } } : {};
}

export function createNinFilter(
  key: string,
  values?: Array<string | number | boolean>,
): FieldFilter<NinFilter> {
  return values && values.length ? { [key]: { _nin: values } } : {};
}

export function createBetweenFilter(
  key: string,
  from?: string,
  to?: string,
): FieldFilter<Partial<GteFilter> & Partial<LteFilter>> {
  const betweenFilter: { _gte?: string; _lte?: string } = {};
  if (from) {
    betweenFilter._gte = from;
  }
  if (to) {
    betweenFilter._lte = to;
  }
  return from || to ? { [key]: betweenFilter } : {};
}
