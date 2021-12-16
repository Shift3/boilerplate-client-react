import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import { ActionButtonProps } from './types';

const ActionButtonStyles = styled.span`
  width: 28px;
  height: 28px;
  display: inline-block;
  text-align: center;
  i, svg path { color: #333; }

  &:hover {
    border-radius: 50%;
    background: #ccc;
  }
`;

export const ActionButton: FC<ActionButtonProps> = ({ icon, tooltipText, onClick, show }) =>
  show ? (
    <OverlayTrigger placement='top' overlay={<Tooltip id=''>{tooltipText}</Tooltip>}>
      <ActionButtonStyles role='button' tabIndex={0} onClick={onClick}>
        <FontAwesomeIcon icon={icon} size='xs' />
      </ActionButtonStyles>
    </OverlayTrigger>
  ) : null;
