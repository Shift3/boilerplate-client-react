/* eslint-disable react/no-array-index-key */
import { FC, useMemo, useState } from 'react';
import { FilterBadges } from './FilterBadges';
import { FilterDropdown } from './FilterDropdown';
import { FilterSearchBar } from './FilterSearchBar';

// ----------------------------------------------------------------------------
// Main Filter Component
// ----------------------------------------------------------------------------
export type OperationOption = {
  operation: string;
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
  defaultFilter: FilterInfo;
  extraFilters?: FilterInfo[];
  onSetFilter: (attribute: string, operation: string, value: string) => void;
  onRemoveFilter: (attribute: string, operation: string) => void;
  onClearFilters: () => void;
};

export const DataTableFilter: FC<DataTableFilterProps> = ({
  defaultFilter,
  extraFilters = [],
  onSetFilter,
  onRemoveFilter,
  onClearFilters,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilterInfo[]>([]);
  const availableFilters = useMemo(
    () =>
      extraFilters.filter(
        extraFilter => !appliedFilters.find(appliedFilter => appliedFilter.filter.attribute === extraFilter.attribute),
      ),
    [appliedFilters],
  );

  const handleDropdownToggle = () => {
    if (extraFilters && extraFilters.length) {
      setShowFilterDropdown(show => !show);
    }
  };

  const handleDropdownClose = () => {
    setShowFilterDropdown(false);
  };

  const handleSearch = (value: string) => {
    onSetFilter(defaultFilter.attribute, defaultFilter.operationOptions[0].operation, value);
    setAppliedFilters(appliedFilters => [
      ...appliedFilters,
      {
        filter: defaultFilter,
        selectedOperation: 0,
        value,
      },
    ]);
  };

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

  return (
    <div>
      <FilterSearchBar
        onSearch={handleSearch}
        onToggle={handleDropdownToggle}
        placeholder={`Search by ${defaultFilter.attributeLabel}...`}
        hasExtraFilters={availableFilters.length > 0}
      />

      <FilterBadges appliedFilters={appliedFilters} onUpdate={handleUpdate} onRemove={handleFilterRemove} />

      {availableFilters.length > 0 && (
        <FilterDropdown
          show={showFilterDropdown}
          filters={availableFilters}
          onClose={handleDropdownClose}
          onApply={handleFilterApply}
        />
      )}
    </div>
  );
};
