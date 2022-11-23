import { useGetReadNotificationsQuery } from 'common/api/notificationApi';
import { AppNotification } from 'common/models/notifications';
import { FC, useEffect, useMemo, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { renderNotification } from './renderNotification';

export const ReadNotifications: FC = () => {
  const [url, setUrl] = useState<string | null>(null);
  const { data, isLoading, isFetching } = useGetReadNotificationsQuery(url, { refetchOnMountOrArgChange: true });
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const hasMore = useMemo(() => {
    if (isLoading || isFetching) return false;
    return !!data?.links.next;
  }, [data, isLoading, isFetching]);

  useEffect(() => {
    if (data && !isLoading) {
      setNotifications(n => [...n, ...data.results]);
    }
  }, [data, isLoading]);

  const fetchMore = () => {
    if (hasMore && data) {
      setUrl(data.links.next);
    }
  };

  return (
    <>
      {notifications &&
        notifications.map((notification: AppNotification) => (
          <Card key={notification.id} className='mb-3'>
            <Card.Body>{renderNotification(notification)}</Card.Body>
          </Card>
        ))}

      {hasMore && (
        <div className='mt-3 mb-3 text-center'>
          <Button disabled={isFetching} onClick={() => fetchMore()} variant='default'>
            Load More
          </Button>
        </div>
      )}
    </>
  );
};
