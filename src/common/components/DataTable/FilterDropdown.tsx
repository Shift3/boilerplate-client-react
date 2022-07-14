import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Filter, FilterOp } from 'common/models';
import React, { FC, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { wasMouseEventOutsideContainer } from 'utils/events';
import { FilterInfo } from './DataTableActiveFilterList';

const StyledDropdown = styled.div`
  position: absolute;
  left: 0;
  z-index: 9999;
  min-width: 240px;

  transition: all 0.15s ease-in-out;

  top: 16px;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.75) translateX(-10%);

  &.show {
    visibility: visible;
    opacity: 1;
    top: 42px;
    transform: scale(1) translateX(0);
  }
`;

const FilterMenu = styled(Card)`
  transition: all 0.15s ease-in-out;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.card.backgroundColor};
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const DropdownContainer = React.forwardRef<HTMLDivElement, { show?: boolean; children: React.ReactNode }>(
  ({ show, children }, ref) => (
    <StyledDropdown className={show ? 'show' : ''} ref={ref}>
      {children}
    </StyledDropdown>
  ),
);

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  h1 {
    font-size: 1.2rem;
    margin: 0;
    flex: 1;
  }
`;

const FilterCategory = styled.div`
  display: block;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${props => props.theme.buttons.defaultBackgroundColor};
  }

  & > .category {
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${props => props.theme.pages.p};
    transition: all 0.15s ease;

    &:hover {
      color: ${props => props.theme.textColor};
    }

    span {
      flex: 1;

      &.active {
        color: ${props => props.theme.textColor};
        font-weight: 600;
      }
    }

    svg {
      transition: all 0.15s ease;
    }
  }

  & > .content {
    visibility: hidden;
    max-height: 0;
    padding: 0 1rem;
    transition: all 0.15s ease;
    overflow: hidden;
    background: ${props => props.theme.backgroundColor};

    label {
      color: ${props => props.theme.textColor};
      font-weight: normal;
      font-size: 0.9rem;
    }
  }

  &.open {
    & > .category {
      color: ${props => props.theme.textColor};

      svg {
        transform: rotateZ(180deg);
      }
    }

    & > .content {
      visibility: visible;
      max-height: 250px;
      padding: 1rem;
    }
  }
`;

const AttributeDropdownMenu: FC<{
  filters: FilterInfo[];
  activeFilters: Filter[];
  setFilter: (name: string, op: FilterOp, value: string) => void;
  clearFilters: () => void;
  removeFilter: (attribute: string, operation: FilterOp) => void;
}> = ({ filters, activeFilters, setFilter, clearFilters, removeFilter }) => {
  const [openFilter, setOpenFilter] = useState<FilterInfo | null>(null);

  const toggleCategory = (filter: FilterInfo) => {
    if (openFilter === filter) setOpenFilter(null);
    else setOpenFilter(filter);
  };

  return (
    <FilterMenu>
      <FilterHeader>
        <h1>Filters</h1>
        <Button variant='link' onClick={clearFilters}>
          Clear All
        </Button>
      </FilterHeader>

      {filters.map((filter, index) => (
        <FilterCategory className={openFilter === filter ? 'open' : ''}>
          <div role='button' tabIndex={-1} className='category' onClick={() => toggleCategory(filter)}>
            <span className={activeFilters.filter(a => a.attr === filter.attribute).length ? 'active' : ''}>
              {filter.attributeLabel}
            </span>
            <FontAwesomeIcon icon='chevron-down' />
          </div>

          <div className='content'>
            {filter.OperationUI ? (
              <filter.OperationUI
                activeFilters={activeFilters.filter(a => a.attr === filter.attribute)}
                attribute={filter.attribute}
                setFilter={setFilter}
                removeFilter={removeFilter}
              />
            ) : (
              <>
                <Form.Check
                  className='mb-2'
                  type='radio'
                  tabIndex={-1}
                  readOnly
                  checked
                  name={filter.attribute}
                  label='Is Exactly'
                />
                <Form.Check
                  className='mb-2'
                  type='radio'
                  tabIndex={-1}
                  readOnly
                  name={filter.attribute}
                  label='Contains'
                />
                <Form.Check
                  className='mb-2'
                  type='radio'
                  tabIndex={-1}
                  readOnly
                  name={filter.attribute}
                  label='Starts With'
                />
                <Form.Check
                  className='mb-2'
                  type='radio'
                  tabIndex={-1}
                  readOnly
                  name={filter.attribute}
                  label='Ends With'
                />

                <input
                  type='input'
                  aria-label='Enter text to filter by'
                  placeholder='Enter filter text...'
                  className='form-control'
                />
              </>
            )}
          </div>
        </FilterCategory>
      ))}
    </FilterMenu>
  );
};

// ----------------------------------------------------------------------------
// Main Dropdown
// ----------------------------------------------------------------------------
export type FilterDropdownProps = {
  show?: boolean;
  filters: FilterInfo[];
  activeFilters: Filter[];
  onClose: () => void;
  setFilter: (name: string, op: FilterOp, value: string) => void;
  clearFilters: () => void;
  removeFilter: (name: string, op: FilterOp) => void;
};

export const FilterDropdown: FC<FilterDropdownProps> = ({
  show = false,
  filters,
  activeFilters,
  onClose,
  setFilter,
  clearFilters,
  removeFilter,
}) => {
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownContainerRef.current) return;

      if (wasMouseEventOutsideContainer(dropdownContainerRef.current, e)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <DropdownContainer show={show} ref={dropdownContainerRef}>
      <AttributeDropdownMenu
        filters={filters}
        activeFilters={activeFilters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        removeFilter={removeFilter}
      />
    </DropdownContainer>
  );
};
