import { FilterOp } from 'common/models';
import { FC, useMemo, useState } from 'react';
import { FilterBadges } from './FilterBadges';
import { FilterDropdown } from './FilterDropdown';
import { FilterSearchBar } from './FilterSearchBar';

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
  defaultFilterAttribute: string;
  defaultFilterOperation: FilterOp;
  onSetFilter: (attribute: string, operation: FilterOp, value: string) => void;
  onRemoveFilter: (attribute: string, operation: FilterOp) => void;
  onClearFilters: () => void;
  onSetSearchText: (searchText: string) => void;
};

export const DataTableFilters: FC<DataTableFilterProps> = ({
  filters = [],
  defaultFilterAttribute,
  defaultFilterOperation,
  onSetFilter,
  onRemoveFilter,
  onClearFilters,
  onSetSearchText,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilterInfo[]>([]);
  const availableFilters = filters.filter(
    filter => !appliedFilters.find(appliedFilter => appliedFilter.filter.attribute === filter.attribute),
  );
  const defaultAttributeLabel = useMemo(
    () => filters.find(filter => filter.attribute === defaultFilterAttribute)?.attributeLabel,
    [filters, defaultFilterAttribute],
  );

  const handleDropdownToggle = () => {
    if (filters.length) {
      setShowFilterDropdown(show => !show);
    }
  };

  const handleDropdownClose = () => {
    setShowFilterDropdown(false);
  };

  const handleSearch = (value: string) => {
    const filter = availableFilters.find(filter => filter.attribute === defaultFilterAttribute);
    const selectedOperation = filter?.operationOptions.findIndex(op => op.operation === defaultFilterOperation) ?? -1;

    if (filter && selectedOperation >= 0) {
      console.log('handleSearch - value -', value);
      onSetSearchText(value);
      onSetFilter(defaultFilterAttribute, defaultFilterOperation, value);
      setAppliedFilters(appliedFilters => [
        ...appliedFilters,
        {
          filter,
          selectedOperation,
          value,
        },
      ]);
    }
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
    if (appliedFilters.length === 1) {
      onSetSearchText('');
    }
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

  return (
    <div>
      <FilterSearchBar
        onSearch={handleSearch}
        onToggle={handleDropdownToggle}
        placeholder={`Search by ${defaultAttributeLabel}...`}
        hasExtraFilters={availableFilters.length > 0}
      />

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
          onClose={handleDropdownClose}
          onApply={handleFilterApply}
        />
      )}
    </div>
  );
};
