import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { StyledOptionButton } from './utilities';

export const DataTableFilterToggle: FC<{
  onDropdownToggle: () => void;
  hasAvailableFilters: boolean;
}> = ({ onDropdownToggle, hasAvailableFilters }) => {
  return (
    <StyledOptionButton onClick={onDropdownToggle} disabled={!hasAvailableFilters} radii='5;0;0;5'>
      <FontAwesomeIcon icon='filter' /> Filters
    </StyledOptionButton>
  );
};
