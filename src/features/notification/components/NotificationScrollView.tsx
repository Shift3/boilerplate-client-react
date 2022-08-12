import { Notification } from 'common/models/notification';
import { useAuth } from 'features/auth/hooks';
import { FC, useEffect } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
import { useInfiniteLoading } from '../hooks/useInfiniteLoading';
import AgentCreatedNotification from './AgentCreatedNotification';
import { environment } from 'environment';
import { VisibilityPixel } from 'common/styles/utilities';
import { getNotifications } from '../utility/utilities';
import { useNotifications } from '../hooks/useNotifications';

interface Props {
  readType: string;
  totalCount: number | null;
}

export const NotificationScrollView: FC<Props> = ({ readType, totalCount }) => {
  const { token } = useAuth();
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  const { notificationState } = useNotifications();

  const { items, hasMore, loadItems, nextCursorLink } = useInfiniteLoading({
    getItems: getNotifications,
    readType,
    token,
  });

  const getNotificationBasedOnType = (notificationType: string, item: Notification) => {
    switch (notificationType) {
      case 'AgentCreatedNotification':
        return <AgentCreatedNotification notification={item} />;
      default:
        return null;
    }
  };

  const renderNotifications = (notificationList: Notification[]) => {
    // return notificationList.map(item => {
    //   const Component = lazy(() => import(`../components/${item.type}`));
    //   return (
    //     <div className='mb-3' key={item.id}>
    //       <Suspense fallback={<Card />}>
    //         <Component notification={item} />
    //       </Suspense>
    //     </div>
    //   );
    // });

    return notificationList.map(item => (
      <div key={item.id} className='mb-3'>
        {getNotificationBasedOnType(item.type, item)}
      </div>
    ));
  };

  useEffect(() => {
    console.log('NotificationScrollView');
    console.log('state:', notificationState);
    if (notificationState.shouldLoadFirstPage && !notificationState.unreadMetaObject) {
      setTimeout(() => {
        // When a notification is received, it doesn't mean that it will be retrievable as a part of the associated query.
        // So, a delay is necessary.
        loadItems('');
      }, 1000);
    }

    if (!notificationState.shouldLoadFirstPage && isVisible && totalCount && items.length < totalCount) {
      loadItems(nextCursorLink ?? '');
    }
  }, [
    isVisible,
    totalCount,
    items.length,
    nextCursorLink,
    loadItems,
    notificationState.shouldLoadFirstPage,
    notificationState.unreadMetaObject,
    readType,
    notificationState,
  ]);

  return (
    <div>
      {renderNotifications(items)}
      {hasMore && nextCursorLink ? <VisibilityPixel ref={ref} /> : null}
    </div>
  );
};
