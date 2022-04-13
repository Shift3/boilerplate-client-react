import { FilterOp } from 'common/models';
import { CancelButton } from 'common/styles/button';
import { FC, useMemo, useState } from 'react';
import { FilterBadges } from './FilterBadges';
import { FilterDropdown } from './FilterDropdown';
import { FilterSearchBar } from './FilterSearchBar';

export type OperationOption = {
  operation: FilterOp;
  operationLabel: string;
};

export type FilterInfo = {
  attribute: string;
  attributeLabel: string;
  operationOptions: OperationOption[];
  InputUI?: FC<{ value: string; onChange: (value: string) => void; options?: OperationOption[] }>;
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
};

export const DataTableFilters: FC<DataTableFilterProps> = ({
  filters = [],
  defaultFilterAttribute,
  defaultFilterOperation,
  onSetFilter,
  onRemoveFilter,
  onClearFilters,
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
        clearFilters={handleFiltersClear}
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

export const PredeterminedFilters: FC<DataTableFilterProps> = ({
  filters = [],
  defaultFilterAttribute,
  defaultFilterOperation,
  onSetFilter,
  onRemoveFilter,
  onClearFilters,
}) => {
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilterInfo[]>([]);
  console.log('appliedFilters:', appliedFilters);
  const availableOperations =
    appliedFilters.length > 0
      ? filters[0].operationOptions.filter(op => op.operationLabel !== appliedFilters[0].value)
      : filters[0].operationOptions;
  const defaultAttributeLabel = useMemo(
    () => filters.find(filter => filter.attribute === defaultFilterAttribute)?.attributeLabel,
    [filters, defaultFilterAttribute],
  );

  const handleFilterRemove = (index: number) => {
    const appliedFilter = appliedFilters[index];
    onRemoveFilter(
      appliedFilter.filter.attribute,
      appliedFilter.filter.operationOptions[appliedFilter.selectedOperation].operation,
    );
    setAppliedFilters(appliedFilters => appliedFilters.filter((_, idx) => idx !== index));
  };

  const handleFiltersClear = () => {
    setAppliedFilters([]);
    onClearFilters();
  };

  const handleRoleChange = (value: string): void => {
    console.log('handleRoleChange');

    console.log('Value:', value);
    console.log('Available Operations:', availableOperations);

    if (availableOperations.find(op => op.operationLabel === value)) {
      const filter = filters.find(filter => filter.attribute === 'role');
      const selectedOperation = filter?.operationOptions.findIndex(op => op.operationLabel === value) ?? -1;

      if (filter && selectedOperation >= 0) {
        handleFiltersClear();

        onSetFilter('role', 'eq', value);

        setAppliedFilters(appliedFilters => [
          ...appliedFilters,
          {
            filter,
            selectedOperation,
            value,
          },
        ]);
      }
    }
  };

  const renderFilterAndCancelButton = (attribute: string, onChange: (value: string) => void) => {
    const filter = filters.find(filter => filter.attribute === attribute);
    const filterIndex = filters.findIndex(filter => filter.attribute === attribute);
    const inputUI = filter?.InputUI;
    const appliedFilter = appliedFilters.find(appliedFilter => appliedFilter.filter.attribute === attribute);

    return (
      <>
        <h6 className='text-muted'>{attribute.charAt(0).toUpperCase() + attribute.substring(1)}</h6>
        {inputUI
          ? inputUI({
              value: appliedFilter?.value ?? '',
              onChange,
              options: filter.operationOptions,
            })
          : null}
        {appliedFilter ? <CancelButton onClick={() => handleFilterRemove(filterIndex)}>Cancel</CancelButton> : null}
      </>
    );
  };

  return <div>{renderFilterAndCancelButton('role', handleRoleChange)}</div>;
};
