import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledFilterMenuToggle = styled(Button)`
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  color: #212529;
  &:disabled {
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    color: #212529;
  }
`;

export const DataTableFilterToggle: FC<{
  onDropdownToggle: () => void;
  hasAvailableFilters: boolean;
}> = ({ onDropdownToggle, hasAvailableFilters }) => {
  return (
    <StyledFilterMenuToggle onClick={onDropdownToggle} disabled={!hasAvailableFilters}>
      <FontAwesomeIcon icon='filter' /> Filters
    </StyledFilterMenuToggle>
  );
};
