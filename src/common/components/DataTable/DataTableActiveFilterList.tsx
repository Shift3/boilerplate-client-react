import { FilterOp } from 'common/models';
import { FC } from 'react';

export type FilterInfo = {
  attribute: string;
  attributeLabel: string;
  OperationUI?: FC<{
    attribute: string;
    setFilter: (name: string, op: FilterOp, value: string) => void;
    removeFilter: (attribute: string, operation: FilterOp) => void;
  }>;
};

export type AppliedFilterInfo = {
  filter: FilterInfo;
  selectedOperation: number;
  value: string;
};
