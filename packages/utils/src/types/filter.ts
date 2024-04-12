export interface Filter {
  [key: string]: {
    _eq?: string | number;
    _neq?: string | number;
    _ilike?: string;
    _in?: Array<string | number>;
    _gte?: string;
    _lte?: string;
  };
}

type FilterWhere = Filter | { [key: string]: FilterWhere };

export interface FilterVariables {
  where: FilterWhere;
}
