import { FilterOp } from 'common/models';
import { FC, useState } from 'react';
import { AppliedFilterInfo, DataTableActiveFilterList, FilterInfo } from './DataTableActiveFilterList';
import { DataTableFilterToggle } from './DataTableFilterToggle';
import { DataTableSearchBar } from './DataTableSearchBar';
import { FilterDropdown } from './FilterDropdown';

export type DataTableSearchAndFilterProps = {
  filters: FilterInfo[];
  placeholder?: string;
  onSetFilter: (attribute: string, operation: FilterOp, value: string) => void;
  onRemoveFilter: (attribute: string, operation: FilterOp) => void;
  onClearFilters: () => void;
  onSetSearchText: (searchText: string) => void;
};

export const DataTableSearchAndFilters: FC<DataTableSearchAndFilterProps> = ({
  filters = [],
  placeholder,
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

  const handleDropdownToggle = () => {
    if (filters.length) {
      setShowFilterDropdown(show => !show);
    }
  };

  const handleDropdownClose = () => {
    setShowFilterDropdown(false);
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

  return (
    <div>
      <div className='d-flex'>
        <DataTableFilterToggle
          onDropdownToggle={handleDropdownToggle}
          hasAvailableFilters={availableFilters.length > 0}
        />
        <DataTableSearchBar placeholder={placeholder} onSetSearchText={onSetSearchText} />
      </div>
      <DataTableActiveFilterList
        appliedFilters={appliedFilters}
        onSetAppliedFilters={setAppliedFilters}
        onSetFilter={onSetFilter}
        onRemoveFilter={onRemoveFilter}
        onClearFilters={onClearFilters}
        showFilterDropdown={showFilterDropdown}
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
