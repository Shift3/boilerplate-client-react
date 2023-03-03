import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { NavLink } from 'react-bootstrap';
import styled from 'styled-components';

const StyledNotificationButton = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 0rem 1rem 1rem;
  position: relative;

  svg {
    margin-right: 1rem;
  }

  #notification-label {
    margin-right: 1rem;
  }

  #notification-counter {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5rem;
    height: 1.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 0.8rem;
    font-weight: bold;
    background-color: ${props => props.theme.noticeBackgroundColor};
    color: ${props => props.theme.noticeTextColor};
    border-radius: 50%;
  }

  @media (min-width: 768px) {
    padding: inherit;
    justify-content: center;

    svg {
      margin-right: 0;
    }

    #notification-label {
      display: none;
    }

    #notification-counter {
      right: 0;
      top: 0;
      transform: none;
      width: 1.25rem;
      height: 1.25rem;
    }

    span {
      color: ${props => props.theme.noticeTextColor};
      font-size: 0.8rem;
    }
  }
`;

interface Props {
  count: number;
  handleOnClick: () => void;
}

export const NotificationButton: FC<Props> = ({ count, handleOnClick }) => {
  return (
    <StyledNotificationButton
      className='me-3'
      alt='Notification'
      id='notification-button'
      onClick={() => handleOnClick()}
    >
      <FontAwesomeIcon size='lg' icon='bell' />
      <span id='notification-label'>Notifications</span>
      {count > 0 ? (
        <div>
          <span id='notification-counter'>{count > 9 ? '9+' : count.toString()}</span>
        </div>
      ) : null}
    </StyledNotificationButton>
  );
};
