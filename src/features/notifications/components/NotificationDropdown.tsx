import { faBell, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetReadNotificationsQuery, useMarkAllReadMutation } from 'common/api/notificationApi';
import { LoadingButton } from 'common/components/LoadingButton';
import { useInfiniteLoading } from 'common/hooks/useInfiniteLoading';
import { PaginatedResult } from 'common/models';
import { AppNotification } from 'common/models/notifications';
import { NoContent } from 'common/styles/utilities';
import { FC, useContext } from 'react';
import { Badge, Button, Nav, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NotificationContext } from '../context';
import { renderNotification } from './renderNotification';
import { useTranslation } from 'react-i18next';

const StyledContainer = styled.div`
  min-width: 420px;
  padding: 1rem;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      font-size: 1.25rem;
      color: ${({ theme }) => theme.textColor};
    }
  }

  .content {
    margin-top: 1rem;
    overflow-y: auto;
    max-height: 400px;
    border-radius: ${props => props.theme.borderRadius};

    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;

    scrollbar-width: thin;
    scrollbar-color: transparent, #90a4ae;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 6px;
      border: 3px solid #90a4ae;
    }
  }

  .notification-item {
    margin-bottom: 0.5rem;
    padding: 1rem;
    border-radius: ${props => props.theme.borderRadius};
    background: ${props => props.theme.backgroundColor};
  }
`;

export const NotificationDropdown: FC = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const {
    notifications: unreadNotifications,
    isLoading: isLoadingUnreadNotifications,
    count: unreadNotificationsCount,
    clear: clearUnreadNotifications,
  } = useContext(NotificationContext);
  const { loadedData: readNotifications, isLoading: isLoadingReadNotifications } = useInfiniteLoading<
    AppNotification,
    PaginatedResult<AppNotification>
  >('', useGetReadNotificationsQuery);
  const [markAllRead, { isLoading: isLoadingMarkAllRead }] = useMarkAllReadMutation();

  const handleMarkAllRead = async () => {
    await markAllRead().unwrap();
    clearUnreadNotifications();
  };

  return (
    <StyledContainer>
      <div className='header'>
        <h3>{t('notifications')}</h3>
        <LoadingButton
          variant='link'
          onClick={() => handleMarkAllRead()}
          loading={isLoadingMarkAllRead}
          disabled={unreadNotificationsCount === 0}
        >
          {t('markAsRead')}
        </LoadingButton>
      </div>

      <Tab.Container defaultActiveKey='unread'>
        <Nav>
          <Nav.Item>
            <Nav.Link eventKey='unread'>
              <FontAwesomeIcon className='me-2' icon={faEnvelope} />
              {t('unread')}
              {unreadNotificationsCount > 0 && (
                <Badge pill bg='danger' className='ms-2'>
                  {unreadNotificationsCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='ms-2'>
            <Nav.Link eventKey='read'>
              <FontAwesomeIcon className='me-2' icon={faEnvelopeOpen} />
              {t('read')}
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className='content'>
          <Tab.Pane eventKey='unread'>
            {!isLoadingUnreadNotifications && unreadNotifications.length === 0 ? (
              <NoContent title={t('noNotifications')} icon={faBell} />
            ) : null}
            {unreadNotifications.map(notification => (
              <div key={notification.id} className='notification-item'>
                {renderNotification(notification)}
              </div>
            ))}
          </Tab.Pane>

          <Tab.Pane eventKey='read'>
            {!isLoadingReadNotifications && readNotifications.length === 0 ? (
              <NoContent title={t('noNotifications')} icon={faBell} />
            ) : null}
            {readNotifications.map(notification => (
              <div key={notification.id} className='notification-item'>
                {renderNotification(notification)}
              </div>
            ))}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <div className='mt-3 d-flex align-items-center justify-content-center'>
        <Button onClick={() => navigate('/notifications')}>{t('viewAllNotifications')}</Button>
      </div>
    </StyledContainer>
  );
};
