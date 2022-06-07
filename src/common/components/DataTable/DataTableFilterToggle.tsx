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
      topLeftBorderRadius={5}
      bottomLeftBorderRadius={5}
    >
      <FontAwesomeIcon icon='filter' /> Filters
    </StyledOptionButton>
  );
};
