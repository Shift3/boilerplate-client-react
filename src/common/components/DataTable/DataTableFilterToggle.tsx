import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { StyledOptionButton } from './utilities';

export const DataTableFilterToggle: FC<{
  onDropdownToggle: () => void;
  hasAvailableFilters: boolean;
}> = ({ onDropdownToggle, hasAvailableFilters }) => {
  return (
    <StyledOptionButton
      onClick={onDropdownToggle}
      disabled={!hasAvailableFilters}
      topleftborderradius={5}
      bottomleftborderradius={5}
    >
      <FontAwesomeIcon icon='filter' /> Filters
    </StyledOptionButton>
  );
};
