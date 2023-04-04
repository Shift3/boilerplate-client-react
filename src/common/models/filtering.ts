export type FilterOp =
  | 'iexact'
  | 'neq'
  | 'contains'
  | 'icontains'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'istartswith'
  | 'iendswith'
  | 'isnull'
  | 'in';

export type Filter = {
  attr: string;
  op: FilterOp;
  value: string;
};

export type FilterQueryParams = {
  filters: Filter[];
};

export type SearchTextParams = {
  searchText: string;
};
