import { Notification } from 'common/models/notification';
import { useAuth } from 'features/auth/hooks';
import { FC, useEffect } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
import { useInfiniteLoading } from '../hooks/useInfiniteLoading';
import AgentCreatedNotification from './AgentCreatedNotification';
import { environment } from 'environment';
import { VisibilityPixel } from 'common/styles/utilities';

interface Props {
  readType: string;
  totalCount: number | null;
}

export const NotificationScrollView: FC<Props> = ({ readType, totalCount }) => {
  const { token } = useAuth();
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  const { items, hasMore, loadItems, nextCursorLink } = useInfiniteLoading({
    getItems: async ({ cursorLink }) => {
      let newURL = '';

      const cursorIndex = cursorLink.indexOf('cursor');

      if (cursorIndex !== -1) {
        newURL = `${cursorLink.substring(cursorIndex)}`;
      } else if (readType === 'unread') {
        newURL = 'read__isnull=true';
      } else if (readType === 'read') {
        newURL = 'read__isnull=false';
      }

      return fetch(`${environment.apiRoute}/notifications/?${newURL}`, {
        headers: { Authorization: `Token ${token}` },
      }).then(response => {
        if (response.ok) {
          return response.json();
        }

        throw response;
      });
    },
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
    if (isVisible && totalCount && items.length <= totalCount) {
      loadItems(nextCursorLink ?? '');
    }
  }, [isVisible, totalCount, items.length, nextCursorLink, loadItems]);

  return (
    <div>
      {renderNotifications(items)}
      {hasMore && nextCursorLink ? <VisibilityPixel ref={ref} /> : null}
    </div>
  );
};
