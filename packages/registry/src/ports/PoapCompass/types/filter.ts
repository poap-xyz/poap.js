interface DateFilter {
  _gte?: string;
  _lte?: string;
}

interface LikeFilter {
  _ilike: string;
}

interface CountFilter {
  predicate: {
    _gt?: number;
    _eq?: number;
  };
}

export interface Where {
  private?: {
    _eq: boolean;
  };
  created_date?: DateFilter;
  attributes?: {
    key?: LikeFilter;
    value?: LikeFilter;
  };
  name?: LikeFilter;
  attributes_aggregate?: {
    count?: CountFilter;
  };
}

export interface OrderBy {
  start_date?: string;
  name?: string;
  id?: string;
}

export interface WhereAttribute {
  key?: LikeFilter;
  value?: LikeFilter;
}
