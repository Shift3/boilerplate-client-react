import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMarkAllReadMutation } from 'common/api/notificationApi';
import { LoadingButton } from 'common/components/LoadingButton';
import { LoadingSpinner } from 'common/components/LoadingSpinner';
import { AppNotification } from 'common/models/notifications';
import { PageHeader, SmallContainer } from 'common/styles/page';
import { NoContent } from 'common/styles/utilities';
import { FC, useContext, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import * as NotificationComponents from '../components';
import { NotificationContext } from '../context';

export const NotificationListView: FC = () => {
  const scrollElement = useRef<HTMLDivElement>(null);
  const {
    notifications,
    hasMore,
    isFetching,
    isLoading: isNotificationsLoading,
    getMore,
    clear,
  } = useContext(NotificationContext);

  const [markAllRead, { isLoading }] = useMarkAllReadMutation();

  const markRead = async () => {
    await markAllRead().unwrap();
    clear();
  };

  useEffect(() => {
    if (isNotificationsLoading) return () => {};

    const element = scrollElement.current;

    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) getMore();
    }, {});
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [scrollElement, getMore, hasMore, isNotificationsLoading, isFetching, notifications]);

  const renderNotification = (notification: AppNotification) => {
    // Dynamic dispatch.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = (NotificationComponents as any)[notification.type];
    // eslint-disable-next-line no-console
    console.assert(
      Component,
      `Could not find notification display component ${notification.type} in notifications/components.tsx\nMake sure to define a handler in that file`,
    );
    if (!Component) {
      // No component for type found.
      return <></>;
    }
    return <Component notification={notification} />;
  };

  return (
    <SmallContainer>
      <PageHeader>
        <div>
          <h1>
            <Trans i18nKey='notifications.title'>My Notifications</Trans>
          </h1>
          <p>
            <Trans i18nKey='notification.subheading'>Notifications that have been sent to me.</Trans>
          </p>
        </div>
        <div>
          <LoadingButton onClick={() => markRead()} loading={isLoading || isNotificationsLoading || isFetching}>
            Mark all Read
          </LoadingButton>
        </div>
      </PageHeader>

      {!isNotificationsLoading && notifications.length === 0 ? (
        <Card>
          <NoContent>
            <FontAwesomeIcon className='text-muted' size='2x' icon={['fas', 'bell']} />
            <p className='lead mb-0'>No Notifications</p>
          </NoContent>
        </Card>
      ) : null}

      {notifications.map(notification => (
        <Card key={notification.id} className='mb-3'>
          <Card.Body>{renderNotification(notification)}</Card.Body>
        </Card>
      ))}

      <div hidden={!hasMore} ref={scrollElement}>
        <LoadingSpinner />
      </div>
    </SmallContainer>
  );
};
