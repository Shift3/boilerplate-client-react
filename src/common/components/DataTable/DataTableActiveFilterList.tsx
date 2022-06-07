import { FilterOp } from 'common/models';
import { FC } from 'react';
import { FilterBadges } from './FilterBadges';

export type OperationOption = {
  operation: FilterOp;
  operationLabel: string;
  InputUI?: FC<{ value: string; onChange: (value: string) => void }>;
};

export type FilterInfo = {
  attribute: string;
  attributeLabel: string;
  operationOptions: OperationOption[];
};

export type AppliedFilterInfo = {
  filter: FilterInfo;
  selectedOperation: number;
  value: string;
};

export type DataTableActiveFilterListProps = {
  appliedFilters: AppliedFilterInfo[];
  showFilterDropdown: boolean;
  onSetAppliedFilters: React.Dispatch<React.SetStateAction<AppliedFilterInfo[]>>;
  onSetFilter: (attribute: string, operation: FilterOp, value: string) => void;
  onRemoveFilter: (attribute: string, operation: FilterOp) => void;
  onClearFilters: () => void;
};

export const DataTableActiveFilterList: FC<DataTableActiveFilterListProps> = ({
  appliedFilters,
  onSetAppliedFilters,
  onSetFilter,
  onRemoveFilter,
  onClearFilters,
}) => {
  const handleFilterRemove = (index: number) => {
    const appliedFilter = appliedFilters[index];
    onRemoveFilter(
      appliedFilter.filter.attribute,
      appliedFilter.filter.operationOptions[appliedFilter.selectedOperation].operation,
    );
    onSetAppliedFilters(appliedFilters => appliedFilters.filter((_, idx) => idx !== index));
  };

  const handleUpdate = (appliedFilterIndex: number, newSelectedOperation: number, newValue: string) => {
    const { filter, selectedOperation } = appliedFilters[appliedFilterIndex];
    onRemoveFilter(filter.attribute, filter.operationOptions[selectedOperation].operation);
    onSetFilter(filter.attribute, filter.operationOptions[newSelectedOperation].operation, newValue);
    onSetAppliedFilters(appliedFilters => {
      appliedFilters[appliedFilterIndex].selectedOperation = newSelectedOperation;
      appliedFilters[appliedFilterIndex].value = newValue;
      return appliedFilters;
    });
  };

  const handleFiltersClear = () => {
    onSetAppliedFilters([]);
    onClearFilters();
  };

  return (
    <div>
      <FilterBadges
        onClearFilters={handleFiltersClear}
        appliedFilters={appliedFilters}
        onUpdate={handleUpdate}
        onRemove={handleFilterRemove}
      />
    </div>
  );
};
