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
            <div role='button' tabIndex={-1} className='category' onClick={() => toggleCategory(filter)}>
              <span className={activeFilters.filter(a => a.attr === filter.attribute).length ? 'active' : ''}>
                {filter.attributeLabel}
              </span>
              <FontAwesomeIcon icon='chevron-down' />
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
