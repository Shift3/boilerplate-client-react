import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useGetReadNotificationsQuery } from 'common/api/notificationApi';
import { useInfiniteLoading } from 'common/hooks/useInfiniteLoading';
import { PaginatedResult } from 'common/models';
import { AppNotification } from 'common/models/notifications';
import { NoContent } from 'common/styles/utilities';
import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { renderNotification } from './renderNotification';
import { useTranslation } from 'react-i18next';

export const ReadNotifications: FC = () => {
  const { t } = useTranslation(['translation', 'common']);
  const {
    loadedData: notifications,
    isLoading,
    isFetching,
    hasMore,
    fetchMore,
  } = useInfiniteLoading<AppNotification, PaginatedResult<AppNotification>>('', useGetReadNotificationsQuery);

  return (
    <>
      {!isLoading && notifications.length === 0 ? (
        <Card>
          <NoContent title={t('noNotifications', { ns: 'common' })} icon={faBell} />
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
          <Button disabled={isFetching} onClick={() => fetchMore()} variant='default'>
            {t('loadMore', { ns: 'common' })}
          </Button>
        </div>
      )}
    </>
  );
};
