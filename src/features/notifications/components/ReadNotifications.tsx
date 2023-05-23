import { faBell } from '@fortawesome/free-solid-svg-icons';
import { notificationApi, useGetReadNotificationsQuery } from 'common/api/notificationApi';
import { useInfiniteLoading } from 'common/hooks/useInfiniteLoading';
import { PaginatedResult } from 'common/models';
import { AppNotification } from 'common/models/notifications';
import { NoContent } from 'common/styles/utilities';
import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { renderNotification } from './renderNotification';

export const ReadNotifications: FC = () => {
  const {
    items: notifications,
    isLoading,
    isFetching,
    hasMore,
    getMore,
  } = useInfiniteLoading<AppNotification, PaginatedResult<AppNotification>>(
    '',
    useGetReadNotificationsQuery,
    notificationApi.util.resetApiState,
  );

  return (
    <>
      {!isLoading && notifications.length === 0 ? (
        <Card>
          <NoContent title='No Notifications' icon={faBell} />
        </Card>
      ) : null}

      {notifications &&
        notifications.map((notification: AppNotification) => (
          <Card key={notification.id} className='mb-3'>
            <Card.Body>{renderNotification(notification)}</Card.Body>
          </Card>
        ))}

      {hasMore && (
        <div className='mt-3 mb-3 text-center'>
          <Button disabled={isFetching} onClick={() => getMore()} variant='default'>
            Load More
          </Button>
        </div>
      )}
    </>
  );
};
