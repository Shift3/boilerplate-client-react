import { FilterOp } from 'common/models';
import { FC, useState } from 'react';
import { DataTableFilters, FilterInfo } from './DataTableFilters';
import { DataTableSearchBar } from './DataTableSearchBar';

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
  const [hasAvailableFilters, setHasAvailableFilters] = useState(true);

  const handleDropdownToggle = () => {
    if (filters.length) {
      setShowFilterDropdown(show => !show);
    }
  };

  const handleDropdownClose = () => {
    setShowFilterDropdown(false);
  };

  const handleAvailableFiltersUpdate = (numOfAvailableFilters: number) => {
    if (numOfAvailableFilters === 0) {
      setHasAvailableFilters(false);
    } else if (!hasAvailableFilters && numOfAvailableFilters > 0) {
      setHasAvailableFilters(true);
    }
  };

  return (
    <div>
      <DataTableSearchBar
        placeholder={placeholder}
        onSetSearchText={onSetSearchText}
        onDropdownToggle={handleDropdownToggle}
        shouldDisableFilterToggle={!hasAvailableFilters}
      />
      <DataTableFilters
        filters={filters}
        onSetFilter={onSetFilter}
        onRemoveFilter={onRemoveFilter}
        onClearFilters={onClearFilters}
        showFilterDropdown={showFilterDropdown}
        onDropdownClose={handleDropdownClose}
        onAvailableFiltersUpdate={handleAvailableFiltersUpdate}
      />
    </div>
  );
};
