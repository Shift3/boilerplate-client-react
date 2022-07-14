import { Filter, FilterOp } from 'common/models';
import { FC } from 'react';

export type FilterInfo = {
  attribute: string;
  attributeLabel: string;
  OperationUI?: FC<{
    attribute: string;
    activeFilters: Filter[];
    setFilter: (name: string, op: FilterOp, value: string) => void;
    removeFilter: (attribute: string, operation: FilterOp) => void;
  }>;
};
