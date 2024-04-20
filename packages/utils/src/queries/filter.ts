import { createField } from './field';
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
  value?: string,
): FieldFilter<LikeFilter<string>> {
  return value
    ? createField<LikeFilter<string>>(key, { _ilike: `%${value}%` })
    : {};
}

export function createEqFilter<V = Value>(
  key: string,
  value?: V,
): FieldFilter<EqFilter<V>> {
  return value ? createField<EqFilter<V>>('key', { _eq: value }) : {};
}

export function createNeqFilter<V = Value>(
  key: string,
  value?: V,
): FieldFilter<NeqFilter<V>> {
  return value ? createField<NeqFilter<V>>(key, { _neq: value }) : {};
}

export function createBoolFilter(
  key: string,
  value?: boolean,
): FieldFilter<EqFilter<'true' | 'false'>> {
  return typeof value === 'boolean'
    ? createField<EqFilter<'true' | 'false'>>(key, {
        _eq: value ? 'true' : 'false',
      })
    : {};
}

export function createAddressFilter(
  key: string,
  value?: string,
): FieldFilter<EqFilter<string>> {
  return value
    ? createField<EqFilter<string>>(key, { _eq: value.toLowerCase() })
    : {};
}

export function createNotNullAddressFilter(
  key: string,
  filterZeroAddress = true,
  filterDeadAddress = true,
): FieldFilter<NeqFilter<string>> | FieldFilter<NinFilter<string>> {
  if (filterZeroAddress && filterDeadAddress) {
    return createField<NinFilter<string>>(key, {
      _nin: [
        '0x0000000000000000000000000000000000000000',
        '0x000000000000000000000000000000000000dead',
      ],
    });
  }
  if (filterZeroAddress) {
    return createField<NeqFilter<string>>(key, {
      _neq: '0x0000000000000000000000000000000000000000',
    });
  }
  if (filterDeadAddress) {
    return createField<NeqFilter<string>>(key, {
      _neq: '0x000000000000000000000000000000000000dead',
    });
  }
  return {};
}

export function createInFilter<V = Value>(
  key: string,
  values?: Array<V>,
): FieldFilter<InFilter<V>> {
  return values && values.length > 0
    ? createField<InFilter<V>>(key, { _in: values })
    : {};
}

export function createNinFilter<V = Value>(
  key: string,
  values?: Array<V>,
): FieldFilter<NinFilter<V>> {
  return values && values.length > 0
    ? createField<NinFilter<V>>(key, { _nin: values })
    : {};
}

export function createLtFilter<V = Value>(
  key: string,
  value?: V,
): FieldFilter<LtFilter<V>> {
  return value ? createField<LtFilter<V>>(key, { _lt: value }) : {};
}

export function createLteFilter<V = Value>(
  key: string,
  value?: V,
): FieldFilter<LteFilter<V>> {
  return value ? createField<LteFilter<V>>(key, { _lte: value }) : {};
}

export function createGtFilter<V = Value>(
  key: string,
  value?: V,
): FieldFilter<GtFilter<V>> {
  return value ? createField<GtFilter<V>>(key, { _gt: value }) : {};
}

export function createGteFilter<V = Value>(
  key: string,
  value?: V,
): FieldFilter<GteFilter<V>> {
  return value ? createField<GteFilter<V>>(key, { _gte: value }) : {};
}

export function createBetweenFilter<V = Value>(
  key: string,
  from?: V,
  to?: V,
): FieldFilter<Partial<GteFilter<V>> & Partial<LteFilter<V>>> {
  const betweenFilter: Partial<GteFilter<V>> & Partial<LteFilter<V>> = {};
  if (from) {
    betweenFilter._gte = from;
  }
  if (to) {
    betweenFilter._lte = to;
  }
  return from || to
    ? createField<Partial<GteFilter<V>> & Partial<LteFilter<V>>>(
        key,
        betweenFilter,
      )
    : {};
}
