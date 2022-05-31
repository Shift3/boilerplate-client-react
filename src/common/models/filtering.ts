export type FilterOp =
  | 'eq'
  | 'neq'
  | 'contains'
  | 'icontains'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'startswith'
  | 'endswith'
  | '$'
  | '='
  | '^'
  | '@';

export type Filter = {
  attr: string;
  op: FilterOp;
  value: string;
};

export type FilterQueryParams = {
  filters: Filter[];
};
