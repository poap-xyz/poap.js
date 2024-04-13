import {
  EqFilter,
  FieldFilter,
  GtFilter,
  GteFilter,
  InFilter,
  LikeFilter,
  LtFilter,
  LteFilter,
  NeqFilter,
  NinFilter,
  Value,
} from '../types/filter';

export function createLikeFilter(
  key: string,
  value?: Value,
): FieldFilter<LikeFilter> {
  return value ? { [key]: { _ilike: `%${value}%` } } : {};
}

export function createEqFilter(
  key: string,
  value?: Value,
): FieldFilter<EqFilter> {
  return value ? { [key]: { _eq: value } } : {};
}

export function createNeqFilter(
  key: string,
  value?: Value,
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

// eslint-disable-next-line complexity
export function createAddressFilter(
  key: string,
  value?: string,
  filterZeroAddress?: boolean,
  filterDeadAddress?: boolean,
): FieldFilter<
  Partial<EqFilter<string>> &
    Partial<NeqFilter<string>> &
    Partial<NinFilter<string>>
> {
  return filterZeroAddress || filterDeadAddress || value
    ? {
        [key]: {
          ...(filterZeroAddress && filterDeadAddress
            ? {
                _nin: [
                  '0x0000000000000000000000000000000000000000',
                  '0x000000000000000000000000000000000000dead',
                ],
              }
            : {}),
          ...(filterZeroAddress && !filterDeadAddress
            ? { _neq: '0x0000000000000000000000000000000000000000' }
            : {}),
          ...(!filterZeroAddress && filterDeadAddress
            ? { _neq: '0x000000000000000000000000000000000000dead' }
            : {}),
          ...(value ? { _eq: value.toLowerCase() } : {}),
        },
      }
    : {};
}

export function createInFilter(
  key: string,
  values?: Array<Value>,
): FieldFilter<InFilter> {
  return values && values.length > 0 ? { [key]: { _in: values } } : {};
}

export function createNinFilter(
  key: string,
  values?: Array<Value>,
): FieldFilter<NinFilter> {
  return values && values.length > 0 ? { [key]: { _nin: values } } : {};
}

export function createLtFilter(
  key: string,
  value?: Value,
): FieldFilter<LtFilter> {
  return value ? { [key]: { _lt: value } } : {};
}

export function createGtFilter(
  key: string,
  value?: Value,
): FieldFilter<GtFilter> {
  return value ? { [key]: { _gt: value } } : {};
}

export function createBetweenFilter(
  key: string,
  from?: Value,
  to?: Value,
): FieldFilter<Partial<GteFilter> & Partial<LteFilter>> {
  const betweenFilter: Partial<GteFilter> & Partial<LteFilter> = {};
  if (from) {
    betweenFilter._gte = from;
  }
  if (to) {
    betweenFilter._lte = to;
  }
  return from || to ? { [key]: betweenFilter } : {};
}
