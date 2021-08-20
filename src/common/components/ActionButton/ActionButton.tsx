import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ActionButtonProps } from './types';

export const ActionButton: FC<ActionButtonProps> = ({ icon, tooltipText, onClick }) => (
  <OverlayTrigger placement='top' overlay={<Tooltip id=''>{tooltipText}</Tooltip>}>
    <span role='button' tabIndex={0} className='px-3 py-1' onClick={onClick} onKeyPress={onClick}>
      <FontAwesomeIcon icon={icon} />
    </span>
  </OverlayTrigger>
);
