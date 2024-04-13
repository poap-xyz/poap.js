type Value = string | number | boolean;

export interface EqFilter<V = Value> {
  _eq: V;
}

export interface NeqFilter<V = Value> {
  _neq: V;
}

export interface LikeFilter<V = Value> {
  _ilike: V;
}

export interface InFilter<V = Value> {
  _in: Array<V>;
}

export interface NinFilter<V = Value> {
  _nin: Array<V>;
}

export interface GtFilter<V = Value> {
  _gt: V;
}

export interface GteFilter<V = Value> {
  _gte: V;
}

export interface LtFilter<V = Value> {
  _lt: V;
}

export interface LteFilter<V = Value> {
  _lte: V;
}

export type AnyFilter = Partial<EqFilter> &
  Partial<NeqFilter> &
  Partial<LikeFilter> &
  Partial<InFilter> &
  Partial<NinFilter> &
  Partial<GtFilter> &
  Partial<GteFilter> &
  Partial<LtFilter> &
  Partial<LteFilter>;

export type FieldFilter<F = AnyFilter> = {
  [key: string]: F;
};

export interface ConditionFilter {
  _or?: Filter[];
  _and?: Filter[];
  _not?: Filter;
}

export type Filter = FieldFilter | ConditionFilter | { [key: string]: Filter };

export interface FilterVariables {
  where: Filter;
}
