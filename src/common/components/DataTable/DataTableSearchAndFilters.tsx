import { FilterOp } from 'common/models';
import { InputGroup } from 'react-bootstrap';
import { AppliedFilterInfo, FilterInfo } from './DataTableActiveFilterList';
import { DataTableFilterToggle } from './DataTableFilterToggle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { FilterDropdown } from './FilterDropdown';

const ClearSearchButton = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 36px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  z-index: 10;
  transition: all 0.15s ease;

  &:hover {
    color: #333;
    cursor: pointer;
  }
`;

const SearchFilterRow = styled.div`
  position: relative;
`;

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
  placeholder = 'Search...',
  onSetFilter,
  onRemoveFilter,
  onClearFilters,
  onSetSearchText,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilterInfo[]>([]);

  const handleDropdownToggle = () => {
    if (filters.length) {
      setShowFilterDropdown(show => !show);
    }
  };

  const handleDropdownClose = () => {
    setShowFilterDropdown(false);
  };

  const setFilter = (attribute: string, operation: FilterOp, value: string) => {
    onSetFilter(attribute, operation, value);
  };

  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSetSearchText(searchValue);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  });

  return (
    <>
      <SearchFilterRow className='mb-3'>
        <InputGroup>
          <DataTableFilterToggle onDropdownToggle={handleDropdownToggle} hasAvailableFilters={filters.length > 0} />

          <FilterDropdown
            show={showFilterDropdown}
            filters={filters}
            onClose={handleDropdownClose}
            setFilter={setFilter}
            clearFilters={onClearFilters}
            removeFilter={onRemoveFilter}
          />

          <Form.Control
            type='text'
            placeholder={placeholder}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </InputGroup>
        {searchValue.length > 0 ? (
          <ClearSearchButton onClick={() => setSearchValue('')}>
            <FontAwesomeIcon icon='close' />
          </ClearSearchButton>
        ) : null}
      </SearchFilterRow>
    </>
  );
};
