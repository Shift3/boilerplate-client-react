import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

export type SortIndicatorProps = {
  isSorted?: boolean;
  isDesc?: boolean;
};

export const SortIndicator: FC<SortIndicatorProps> = ({ isSorted, isDesc }) => {
  return (
    <span>
      {!isSorted && <FontAwesomeIcon icon={faSort} />}
      {isSorted && !isDesc && <FontAwesomeIcon icon={faSortUp} />}
      {isSorted && isDesc && <FontAwesomeIcon icon={faSortDown} />}
    </span>
  );
};
