import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useMarkAllReadMutation } from 'common/api/notificationApi';
import { LoadingButton } from 'common/components/LoadingButton';
import { NoContent } from 'common/styles/utilities';
import { FC, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { NotificationContext } from '../context';
import { renderNotification } from './renderNotification';
import { useTranslation } from 'react-i18next';

export const UnreadNotifications: FC = () => {
  const { t } = useTranslation(['translation', 'common']);
  const {
    notifications,
    hasMore,
    isFetching,
    isLoading: isNotificationsLoading,
    getMore,
    count,
    clear,
  } = useContext(NotificationContext);

  const [markAllRead, { isLoading }] = useMarkAllReadMutation();
  const handleMarkAllRead = async () => {
    await markAllRead().unwrap();
    clear();
  };

  return (
    <>
      {!isNotificationsLoading && notifications.length === 0 ? (
        <Card>
          <NoContent title={t('noNotifications', { ns: 'common' })} icon={faBell} />
        </Card>
      ) : null}

      {notifications.length ? (
        <div className='text-end mb-3'>
          <LoadingButton
            onClick={() => handleMarkAllRead()}
            loading={isLoading || isNotificationsLoading || isFetching}
            disabled={count === 0}
          >
            {t('markAsRead', { ns: 'common' })}
          </LoadingButton>
        </div>
      ) : null}

      {notifications.map(notification => (
        <Card key={notification.id} className='mb-3'>
          <Card.Body>{renderNotification(notification)}</Card.Body>
        </Card>
      ))}

      {hasMore && (
        <div className='mt-3 mb-3 text-center'>
          <Button disabled={isFetching} onClick={() => getMore()} variant='default'>
            {t('loadMore', { ns: 'common' })}
          </Button>
        </div>
      )}
    </>
  );
};
