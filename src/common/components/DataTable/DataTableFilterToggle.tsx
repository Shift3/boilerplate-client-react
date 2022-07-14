import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Filter } from 'common/models';
import { FC } from 'react';
import { Badge, Button } from 'react-bootstrap';

export const DataTableFilterToggle: FC<{
  onDropdownToggle: () => void;
  activeFilters: Filter[];
}> = ({ onDropdownToggle, activeFilters }) => {
  return (
    <Button variant='default' onClick={onDropdownToggle}>
      <FontAwesomeIcon icon='filter' /> Filters{' '}
      {activeFilters.length > 0 ? (
        <Badge pill bg='dark'>
          {activeFilters.length} active
        </Badge>
      ) : (
        ''
      )}
    </Button>
  );
};
