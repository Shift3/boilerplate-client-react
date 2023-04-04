import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { NavLink } from 'react-bootstrap';
import styled from 'styled-components';

const StyledNotificationButton = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;

  #notification-counter {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    position: absolute;
    right: 2px;
    top: 9px;
    transform: translateY(-50%);
    width: 0.6rem;
    height: 0.6rem;

    font-size: 0.7rem;
    font-weight: bold;
    background-color: ${props => props.theme.noticeBackgroundColor};
    color: ${props => props.theme.noticeTextColor};
    border-radius: 50%;
  }
`;

interface Props {
  count: number;
}

export const NotificationButton: FC<Props> = ({ count }) => {
  return (
    <StyledNotificationButton alt='Notification'>
      <FontAwesomeIcon icon='bell' />
      {count > 0 ? (
        <div>
          <span id='notification-counter' />
        </div>
      ) : null}
    </StyledNotificationButton>
  );
};
