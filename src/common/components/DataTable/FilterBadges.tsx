import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import styled from 'styled-components';
import { AppliedFilterInfo } from './Filter';
import { OperationDropdownMenu } from './FilterDropdown';

// ----------------------------------------------------------------------------
// Styled components
// ----------------------------------------------------------------------------
const StyledContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
`;

const StyledFilterBadge = styled(Badge).attrs({ pill: true })`
  display: flex;
  gap: 10px;
  padding: 0.4rem 0.75rem;
  background-color: #eae6e5 !important;
  color: #666;
  cursor: pointer;

  p {
    word-spacing: 5px;
    margin: 0;

    span {
      color: #212529;
    }
  }
`;

const StyledDropdownContainer = styled.div`
  position: absolute;
  z-index: 9999;
`;

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
const FilterBadge: FC<{
  appliedFilter: AppliedFilterInfo;
  onUpdate: (selectedOperation: number, value: string) => void;
  onClose: () => void;
}> = ({ appliedFilter, onUpdate, onClose }) => {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(appliedFilter.selectedOperation);

  const toggleEditMenu = () => setShowEditMenu(show => !show);

  const handleBadgeKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      toggleEditMenu();
    }
  };

  const handleCloseIconKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      onClose();
    }
  };

  const handleCancel = () => setShowEditMenu(false);

  const handleApply = (value: string) => {
    onUpdate(selectedOperation, value);
    setShowEditMenu(false);
  };

  return (
    <div>
      <StyledFilterBadge tabIndex={0} onClick={toggleEditMenu} onKeyDown={handleBadgeKeyDown}>
        <p>
          <span>{appliedFilter.filter.attributeLabel}</span>{' '}
          {appliedFilter.filter.operationOptions[appliedFilter.selectedOperation].operationLabel}{' '}
          <span>{appliedFilter.value}</span>
        </p>
        <div>
          <span role='button' tabIndex={0} onClick={onClose} onKeyDown={handleCloseIconKeyDown}>
            <FontAwesomeIcon icon='circle-xmark' />
          </span>
        </div>
      </StyledFilterBadge>
      {showEditMenu && (
        <StyledDropdownContainer>
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

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export type FilterBadgesProps = {
  appliedFilters: AppliedFilterInfo[];
  onUpdate: (index: number, selectedOperation: number, value: string) => void;
  onRemove: (index: number) => void;
};

export const FilterBadges: FC<FilterBadgesProps> = ({ appliedFilters, onUpdate, onRemove }) => {
  const handleUpdate = (index: number) => (selectedOperation: number, value: string) =>
    onUpdate(index, selectedOperation, value);
  return (
    <StyledContainer>
      {appliedFilters.map((appliedFilter, index) => (
        <FilterBadge
          key={appliedFilter.filter.attribute}
          appliedFilter={appliedFilter}
          onUpdate={handleUpdate(index)}
          onClose={() => onRemove(index)}
        />
      ))}
    </StyledContainer>
  );
};
