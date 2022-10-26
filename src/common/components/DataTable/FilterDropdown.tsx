import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Filter, FilterOp } from 'common/models';
import { FC, useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { wasMouseEventOutsideContainer } from 'utils/events';
import { FilterUI } from './Filters';

export type FilterInfo = {
  attribute: string;
  attributeLabel: string;
  FilterUI: FilterUI;
};

const StyledDropdown = styled.div`
  position: absolute;
  left: 0;
  z-index: 1000;
  min-width: 240px;

  transition: all 0.15s ease-in-out;

  top: 16px;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.75) translateX(-10%);

  &.show {
    visibility: visible;
    opacity: 1;
    top: 46px;
    transform: scale(1) translateX(0);
  }
`;

const FilterMenu = styled(Card)`
  transition: all 0.15s ease-in-out;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.card.backgroundColor};
  box-shadow: ${props => props.theme.boxShadow} !important;
  border: ${props => props.theme.card.border} !important;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

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

  .action-container {
    display: flex;
    align-items: center;

    svg.remove {
      padding: 0.5rem 0.75rem;
      display: none;
      cursor: pointer;

      &.active {
        display: inline-block;
      }
    }

    svg.toggle {
      padding: 0.5rem 0.75rem;
      transition: all 0.15s ease;
      min-width: 2rem;
      cursor: pointer;
    }

    .category {
      padding: 0.75rem 1rem;
      flex: 1;
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
    .action-container > .category {
      color: ${props => props.theme.textColor};
    }

    .action-container {
      svg.toggle {
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

export const FilterDropdown: FC<{
  show?: boolean;
  filters: FilterInfo[];
  activeFilters: Filter[];
  onClose: () => void;
  setFilter: (name: string, op: FilterOp, value: string) => void;
  clearFilters: () => void;
  removeFilter: (name: string, op: FilterOp) => void;
}> = ({ show = false, filters, activeFilters, onClose, setFilter, clearFilters, removeFilter }) => {
  const [openFilter, setOpenFilter] = useState<FilterInfo | null>(null);
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

  const toggleCategory = (filter: FilterInfo) => {
    if (openFilter === filter) setOpenFilter(null);
    else setOpenFilter(filter);
  };

  const isFilterActive = (filter: FilterInfo) => {
    return activeFilters.find(a => a.attr === filter.attribute);
  };

  const handleFilterRemoval = (filter: FilterInfo) => {
    const filterToRemove = activeFilters.find(a => a.attr === filter.attribute);

    if (filterToRemove) {
      removeFilter(filterToRemove.attr, filterToRemove.op);
    }
  };

  return (
    <StyledDropdown className={show ? 'show' : ''} ref={dropdownContainerRef}>
      <FilterMenu>
        <FilterHeader>
          <h1>Filters</h1>
          <a href='#' role='button' tabIndex={-1} hidden={activeFilters.length === 0} onClick={clearFilters}>
            Clear All
          </a>
        </FilterHeader>

        {filters.map(filter => (
          <FilterCategory key={filter.attribute} className={openFilter === filter ? 'open' : ''}>
            <div className='action-container'>
              <div role='button' tabIndex={-1} className='category' onClick={() => toggleCategory(filter)}>
                <span className={isFilterActive(filter) ? 'active' : ''}>{filter.attributeLabel}</span>
              </div>
              <FontAwesomeIcon
                className={`remove ${isFilterActive(filter) ? 'active' : ''}`}
                icon='xmark'
                onClick={() => handleFilterRemoval(filter)}
              />
              <FontAwesomeIcon className='toggle' icon='chevron-down' onClick={() => toggleCategory(filter)} />
            </div>

            <div className='content'>
              <filter.FilterUI
                activeFilters={activeFilters.filter(a => a.attr === filter.attribute)}
                attribute={filter.attribute}
                setFilter={setFilter}
                removeFilter={removeFilter}
              />
            </div>
          </FilterCategory>
        ))}
      </FilterMenu>
    </StyledDropdown>
  );
};
