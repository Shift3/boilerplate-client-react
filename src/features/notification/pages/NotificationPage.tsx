import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageCrumb, PageHeader, SmallContainer, PageNav } from 'common/styles/page';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { Badge, Button } from 'react-bootstrap';
import { useGetReadQuery, useGetUnreadQuery, useMarkAllReadMutation } from 'common/api/notificationApi';
import { NotificationScrollView } from '../components/NotificationScrollView';
import { getCount, getMeta } from '../utility/utilities';

export const NotificationPage: FC = () => {
  const [tab, setTab] = useState('unread');
  const { data: unread } = useGetUnreadQuery();
  const { data: read } = useGetReadQuery();
  const [markAllRead] = useMarkAllReadMutation();

  const handleMarkAllReadOperation = async () => {
    await markAllRead();
  };

  const unreadCount = getCount(unread);
  const unreadMeta = getMeta(unread);
  const readCount = getCount(read);
  const readMeta = getMeta(read);

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
        <Button variant='primary' disabled={unreadCount === 0} onClick={() => handleMarkAllReadOperation()}>
          Mark All Read
        </Button>
      </PageHeader>
      <PageNav defaultActiveKey='/home'>
        <PageNav.Link onClick={() => setTab('unread')} className={tab === 'unread' ? 'active' : ''}>
          Unread{' '}
          <Badge className='ms-1 me-2' pill bg='secondary'>
            {unreadCount}
          </Badge>
        </PageNav.Link>
        <PageNav.Link onClick={() => setTab('read')} className={tab === 'read' ? 'active' : ''}>
          Read{' '}
          <Badge className='ms-1' pill bg='secondary'>
            {readCount}
          </Badge>
        </PageNav.Link>
      </PageNav>
      <hr className='mt-0' />
      {tab === 'unread' && unreadMeta ? <NotificationScrollView readType='unread' totalCount={unreadCount} /> : null}
      {tab === 'read' && readMeta ? <NotificationScrollView readType='read' totalCount={readCount} /> : null}
    </SmallContainer>
  );
};
