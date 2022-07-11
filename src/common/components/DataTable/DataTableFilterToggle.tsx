import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { Button } from 'react-bootstrap';

export const DataTableFilterToggle: FC<{
  onDropdownToggle: () => void;
  hasAvailableFilters: boolean;
}> = ({ onDropdownToggle, hasAvailableFilters }) => {
  return (
    <Button variant='default' onClick={onDropdownToggle} disabled={!hasAvailableFilters}>
      <FontAwesomeIcon icon='filter' /> Filters
    </Button>
  );
};
