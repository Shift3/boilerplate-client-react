import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import styled from 'styled-components';
import { wasMouseEventOutsideContainer } from 'utils/events';
import { AppliedFilterInfo } from './DataTableActiveFilterList';
import { OperationDropdownMenu } from './FilterDropdown';

const StyledContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;

  & > button {
    font-size: 12px;
    padding: 0.1rem 0.75rem;
  }
`;

const StyledFilterBadge = styled(Badge).attrs({ pill: true })`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0.4rem 0.75rem;
  background-color: #eae6e5 !important;
  color: #666;
  cursor: pointer;

  div {
    margin: 0;

    span {
      color: #212529;
    }

    span[role='button'] {
      color: #666;
    }
  }
`;

const StyledDropdownContainer = styled.div`
  position: absolute;
  z-index: 9999;
`;

const FilterBadge: FC<{
  appliedFilter: AppliedFilterInfo;
  onUpdate: (selectedOperation: number, value: string) => void;
  onRemove: () => void;
}> = ({ appliedFilter, onUpdate, onRemove }) => {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(appliedFilter.selectedOperation);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const toggleEditMenu = () => setShowEditMenu(show => !show);

  const handleBadgeKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      toggleEditMenu();
    }
  };

  const handleCloseIconKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      onRemove();
    }
  };

  const handleCancel = () => setShowEditMenu(false);

  const handleApply = (value: string) => {
    onUpdate(selectedOperation, value);
    setShowEditMenu(false);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        handleCancel();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownContainerRef.current) return;

      if (wasMouseEventOutsideContainer(dropdownContainerRef.current, e)) {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <StyledFilterBadge tabIndex={0} onClick={toggleEditMenu} onKeyDown={handleBadgeKeyDown}>
        <div>
          <span>{appliedFilter.filter.attributeLabel}</span>{' '}
          {appliedFilter.filter.operationOptions[appliedFilter.selectedOperation].operationLabel}{' '}
          <span>{appliedFilter.value}</span>
        </div>
        <div>
          <span role='button' tabIndex={0} onClick={onRemove} onKeyDown={handleCloseIconKeyDown}>
            <FontAwesomeIcon icon='x' />
          </span>
        </div>
      </StyledFilterBadge>
      {showEditMenu && (
        <StyledDropdownContainer ref={dropdownContainerRef}>
          <OperationDropdownMenu
            show={showEditMenu}
            filter={appliedFilter.filter}
            selected={selectedOperation}
            defaultValue={appliedFilter.value}
            onSelect={setSelectedOperation}
            onCancel={handleCancel}
            onApply={handleApply}
          />
        </StyledDropdownContainer>
      )}
    </div>
  );
};

export type FilterBadgesProps = {
  appliedFilters: AppliedFilterInfo[];
  onUpdate: (index: number, selectedOperation: number, value: string) => void;
  onRemove: (index: number) => void;
  onClearFilters: () => void;
};

export const FilterBadges: FC<FilterBadgesProps> = ({ appliedFilters, onClearFilters, onUpdate, onRemove }) => {
  const handleUpdate = (index: number) => (selectedOperation: number, value: string) =>
    onUpdate(index, selectedOperation, value);
  return (
    <StyledContainer>
      {appliedFilters.map((appliedFilter, index) => (
        <FilterBadge
          key={appliedFilter.filter.attribute}
          appliedFilter={appliedFilter}
          onUpdate={handleUpdate(index)}
          onRemove={() => onRemove(index)}
        />
      ))}

      {appliedFilters.length > 0 ? (
        <Button onClick={onClearFilters} size='sm' variant='secondary'>
          Clear Filters
        </Button>
      ) : null}
    </StyledContainer>
  );
};
