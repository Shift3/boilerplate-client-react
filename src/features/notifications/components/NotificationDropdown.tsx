import { FC, useContext } from 'react';
import { Button, CloseButton, Nav, Row, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import { useGetReadNotificationsQuery, useMarkAllReadMutation } from 'common/api/notificationApi';
import { renderNotification } from './renderNotification';
import { NotificationContext } from '../context';
import { AppNotification } from 'common/models/notifications';
import { PaginatedResult } from 'common/models';
import { useInfiniteLoading } from 'common/hooks/useInfiniteLoading';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from 'common/components/LoadingButton';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NoContent } from 'common/styles/utilities';

const StyledContainer = styled.div`
  width: 400px;
  height: 400px;
  z-index: 1060;
  display: flex;
  flex-direction: column;
  padding: 0 0 1rem 1rem !important;

  div#header {
    height: 15%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h3 {
      padding-top: 1rem;
      color: ${props => props.theme.textColor};
    }

    button {
      padding: 1rem;
      margin-top: 0.25rem;
      margin-right: 0.25rem;
    }
  }

  div#body {
    height: 85%;
    padding-right: 1rem;

    div#tabs-and-mark-all {
      margin: 0.813rem 0px;
      align-items: center;
      justify-content: space-between;
      height: 10%;

      #notification-type-tabs {
        display: flex;
        flex: 4;

        .nav-item a {
          padding: 0px;
          padding: 0px !important;
          margin: 0px 0.625rem 0px 0px;
        }

        .nav-item a.active {
          border-radius: 0px;
          border-bottom: 2px solid ${props => props.theme.linkColor};
          background: none;
          color: ${props => props.theme.linkColor};
        }

        .nav-item a:hover {
          border-radius: 0px;
          background: none;
        }
      }

      #mark-all-container {
        display: flex;
        flex: 3;
        justify-content: flex-end;
        padding: 0px;

        button#mark-all-btn {
          display: inline;
          padding: 0.188rem 0.438rem;
          border-radius: 0.375rem;
          pointer: cursor;
          background-color: ${props => props.theme.buttons.darkBackgroundColor};
          color: ${props => props.theme.buttons.primaryTextColor};
        }
      }
    }

    div#notification-lists {
      padding-bottom: 2rem;
      margin: 0.625rem 0px 0px;
      height: 90%;

      .tab-content {
        padding: 0;
        height: 100%;

        .tab-pane {
          height: 100%;
          overflow-y: auto;

          .notification-item {
            width: 100%;
            padding: 0.5rem 0;
            border-top: 1px solid grey;

            div h1,
            span {
              color: ${props => props.theme.textColor};
            }
          }
        }

        .tab-pane.active {
          display: flex;
          flex-direction: column;
          align-items: center;

          div.noContentStyles {
            border: 1px dashed ${props => props.theme.notifications.noContentBorder};
            width: 100%;
            height: 100%;
            min-height: 0px;
          }
        }
      }
    }
  }
`;

interface Props {
  onClose: () => void;
}

export const NotificationDropdown: FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const {
    notifications: unreadNotifications,
    isLoading: isLoadingUnreadNotifications,
    hasMore: hasMoreUnreadNotifications,
    clear,
  } = useContext(NotificationContext);
  const {
    loadedData: readNotifications,
    isLoading: isLoadingReadNotifications,
    hasMore: hasMoreReadNotifications,
  } = useInfiniteLoading<AppNotification, PaginatedResult<AppNotification>>('', useGetReadNotificationsQuery);
  const [markAllRead, { isLoading: isLoadingMarkAllRead }] = useMarkAllReadMutation();
  const handleMarkAllRead = async () => {
    await markAllRead().unwrap();
    clear();
  };

  return (
    <StyledContainer id='notification-dropdown' className='dropdown-menu'>
      <div id='header'>
        <h3>Notifications</h3>
        <CloseButton onClick={() => onClose()} />
      </div>
      <div id='body'>
        <Tab.Container defaultActiveKey='unread'>
          <Row id='tabs-and-mark-all'>
            <Nav id='notification-type-tabs'>
              <Nav.Item>
                <Nav.Link eventKey='unread'>unread</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='read'>read</Nav.Link>
              </Nav.Item>
            </Nav>
            <div id='mark-all-container'>
              <LoadingButton id='mark-all-btn' onClick={() => handleMarkAllRead()} loading={isLoadingMarkAllRead}>
                mark all as read
              </LoadingButton>
            </div>
          </Row>
          <Row id='notification-lists'>
            <Tab.Content>
              <Tab.Pane eventKey='unread'>
                {!isLoadingUnreadNotifications && unreadNotifications.length === 0 ? (
                  <NoContent title='No Notifications' icon={faBell} />
                ) : null}
                {unreadNotifications.map(notification => (
                  <div key={notification.id} className='notification-item'>
                    {renderNotification(notification)}
                  </div>
                ))}
                {hasMoreUnreadNotifications && (
                  <Button className='mt-3' onClick={() => navigate('/notifications')}>
                    View All Notifications
                  </Button>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey='read'>
                {!isLoadingReadNotifications && readNotifications.length === 0 ? (
                  <NoContent title='No Notifications' icon={faBell} />
                ) : null}
                {readNotifications.map(notification => (
                  <div key={notification.id} className='notification-item'>
                    {renderNotification(notification)}
                  </div>
                ))}
                {hasMoreReadNotifications && (
                  <Button className='mt-3' onClick={() => navigate('/notifications')}>
                    View All Notifications
                  </Button>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </div>
    </StyledContainer>
  );
};
