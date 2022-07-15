import { Filter, FilterOp } from 'common/models';
import { Badge, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { FilterDropdown, FilterInfo } from './FilterDropdown';

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
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  const handleDropdownToggle = () => {
    if (filters.length) {
      setShowFilterDropdown(show => !show);
    }
  };

  const handleDropdownClose = () => {
    setShowFilterDropdown(false);
  };

  const setFilter = (attribute: string, operation: FilterOp, value: string) => {
    const existingFilter = activeFilters.find(filter => filter.attr === attribute);
    let newFilters;
    if (existingFilter) {
      newFilters = [
        ...activeFilters.filter(filter => filter.attr !== attribute),
        {
          attr: attribute,
          op: operation,
          value,
        },
      ];
    } else {
      newFilters = [
        ...activeFilters,
        {
          attr: attribute,
          op: operation,
          value,
        },
      ];
    }
    setActiveFilters(newFilters);
    onSetFilter(attribute, operation, value);
  };

  const removeFilter = (attr: string, op: FilterOp) => {
    setActiveFilters(activeFilters.filter(filter => filter.attr !== attr && filter.op !== op));
    onRemoveFilter(attr, op);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    onClearFilters();
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
          <Button variant='default' onClick={handleDropdownToggle}>
            <FontAwesomeIcon icon='filter' /> Filters{' '}
            {activeFilters.length > 0 ? (
              <Badge pill bg='dark'>
                {activeFilters.length} active
              </Badge>
            ) : (
              ''
            )}
          </Button>

          <FilterDropdown
            show={showFilterDropdown}
            filters={filters}
            activeFilters={activeFilters}
            onClose={handleDropdownClose}
            setFilter={setFilter}
            clearFilters={clearFilters}
            removeFilter={removeFilter}
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
