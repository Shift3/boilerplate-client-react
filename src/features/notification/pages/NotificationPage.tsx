import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageCrumb, PageHeader, SmallContainer, PageNav } from 'common/styles/page';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { Badge, Button } from 'react-bootstrap';
import { useMarkAllReadMutation } from 'common/api/notificationApi';
import { NotificationScrollView } from '../components/NotificationScrollView';
import { useNotifications } from '../hooks/useNotifications';

export const NotificationPage: FC = () => {
  const [tab, setTab] = useState('unread');
  // const { totalUnreadCount, totalReadCount, unreadMetaObject, readMetaObject } = useNotifications();
  const { notificationState, notificationDispatch } = useNotifications();
  const [markAllRead] = useMarkAllReadMutation();

  const handleMarkAllReadOperation = async () => {
    await markAllRead();
  };

  useEffect(() => {
    console.log('Hello There');
  }, [notificationState.totalUnreadCount, notificationState.totalReadCount]);

  return (
    <SmallContainer>
      <PageCrumb>
        <Link to='/agents'>
          <>
            <FontAwesomeIcon icon={['fas', 'chevron-left']} />
            <Trans i18nKey='userProfile.back'>Back to Agent List</Trans>
          </>
        </Link>
      </PageCrumb>
      <PageHeader className='mb-3'>
        <div>
          <h1>Notifications</h1>
        </div>
        <Button
          variant='primary'
          disabled={notificationState.totalUnreadCount === 0}
          onClick={() => handleMarkAllReadOperation()}
        >
          Mark All Read
        </Button>
      </PageHeader>
      <PageNav defaultActiveKey='/home'>
        <PageNav.Link onClick={() => setTab('unread')} className={tab === 'unread' ? 'active' : ''}>
          Unread{' '}
          <Badge className='ms-1 me-2' pill bg='secondary'>
            {notificationState.totalUnreadCount}
          </Badge>
        </PageNav.Link>
        <PageNav.Link onClick={() => setTab('read')} className={tab === 'read' ? 'active' : ''}>
          Read{' '}
          <Badge className='ms-1' pill bg='secondary'>
            {notificationState.totalReadCount}
          </Badge>
        </PageNav.Link>
      </PageNav>
      <hr className='mt-0' />
      {tab === 'unread' && notificationState.unreadMetaObject ? (
        <NotificationScrollView readType='unread' totalCount={notificationState.totalUnreadCount} />
      ) : null}
      {tab === 'read' && notificationState.readMetaObject ? (
        <NotificationScrollView readType='read' totalCount={notificationState.totalReadCount} />
      ) : null}
    </SmallContainer>
  );
};
