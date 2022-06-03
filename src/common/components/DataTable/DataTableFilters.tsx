import { FilterOp } from 'common/models';
import { FC, useEffect, useState } from 'react';
import { FilterBadges } from './FilterBadges';
import { FilterDropdown } from './FilterDropdown';

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

export type DataTableFilterProps = {
  filters: FilterInfo[];
  showFilterDropdown: boolean;
  onSetFilter: (attribute: string, operation: FilterOp, value: string) => void;
  onRemoveFilter: (attribute: string, operation: FilterOp) => void;
  onClearFilters: () => void;
  onDropdownClose: () => void;
  onAvailableFiltersUpdate: (numOfAvailableFilters: number) => void;
};

export const DataTableFilters: FC<DataTableFilterProps> = ({
  filters = [],
  showFilterDropdown,
  onSetFilter,
  onRemoveFilter,
  onClearFilters,
  onDropdownClose,
  onAvailableFiltersUpdate,
}) => {
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilterInfo[]>([]);
  const availableFilters = filters.filter(
    filter => !appliedFilters.find(appliedFilter => appliedFilter.filter.attribute === filter.attribute),
  );

  const handleFilterApply = (selectedAttribute: number, selectedOperation: number, value: string) => {
    onSetFilter(
      availableFilters[selectedAttribute].attribute,
      availableFilters[selectedAttribute].operationOptions[selectedOperation].operation,
      value,
    );
    setAppliedFilters(appliedFilters => [
      ...appliedFilters,
      {
        filter: availableFilters[selectedAttribute],
        selectedOperation,
        value,
      },
    ]);
  };

  const handleFilterRemove = (index: number) => {
    const appliedFilter = appliedFilters[index];
    onRemoveFilter(
      appliedFilter.filter.attribute,
      appliedFilter.filter.operationOptions[appliedFilter.selectedOperation].operation,
    );
    setAppliedFilters(appliedFilters => appliedFilters.filter((_, idx) => idx !== index));
  };

  const handleUpdate = (appliedFilterIndex: number, newSelectedOperation: number, newValue: string) => {
    const { filter, selectedOperation } = appliedFilters[appliedFilterIndex];
    onRemoveFilter(filter.attribute, filter.operationOptions[selectedOperation].operation);
    onSetFilter(filter.attribute, filter.operationOptions[newSelectedOperation].operation, newValue);
    setAppliedFilters(appliedFilters => {
      appliedFilters[appliedFilterIndex].selectedOperation = newSelectedOperation;
      appliedFilters[appliedFilterIndex].value = newValue;
      return appliedFilters;
    });
  };

  const handleFiltersClear = () => {
    setAppliedFilters([]);
    onClearFilters();
  };

  useEffect(() => {
    onAvailableFiltersUpdate(availableFilters.length);
  }, [availableFilters]);
  return (
    <div>
      <FilterBadges
        onClearFilters={handleFiltersClear}
        appliedFilters={appliedFilters}
        onUpdate={handleUpdate}
        onRemove={handleFilterRemove}
      />

      {availableFilters.length > 0 && (
        <FilterDropdown
          show={showFilterDropdown}
          filters={availableFilters}
          onClose={onDropdownClose}
          onApply={handleFilterApply}
        />
      )}
    </div>
  );
};
