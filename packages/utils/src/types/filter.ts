interface FieldFilter {
  [key: string]: {
    _eq?: string | number | boolean;
    _neq?: string | number | boolean;
    _ilike?: string;
    _in?: Array<string | number | boolean>;
    _nin?: Array<string | number | boolean>;
    _gte?: string;
    _lte?: string;
  };
}

interface ConditionFilter {
  _or?: Filter[];
  _and?: Filter[];
  _not?: Filter;
}

type Filter = FieldFilter | ConditionFilter | { [key: string]: Filter };

export interface FilterVariables {
  where: Filter;
}
