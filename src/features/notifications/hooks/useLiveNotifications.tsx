import { notificationApi, useGetEventTokenQuery, useGetUnreadNotificationsQuery } from 'common/api/notificationApi';
import { useInfiniteLoading } from 'common/hooks/useInfiniteLoading';
import { PaginatedResult } from 'common/models';
import { AppNotification } from 'common/models/notifications';
import { environment } from 'environment';
import { useAuth } from 'features/auth/hooks';
import * as NotificationComponents from 'features/notifications/components';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export const useLiveNotifications = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { items, count, hasMore, getMore, isFetching, isLoading, refetch, clear, addOneToFront, remove } = useInfiniteLoading<
    AppNotification,
    PaginatedResult<AppNotification>
  >(null, useGetUnreadNotificationsQuery, notificationApi, { skip: !user });

  console.log('useLiveNotifications - items -', items);

  const [enablePolling, setEnablePolling] = useState(true);
  const { data: eventToken } = useGetEventTokenQuery(undefined, {
    skip: !user,
    pollingInterval: enablePolling ? 3000 : 0,
  });

  useEffect(() => {
    if (user) {
      refetch();
    } else {
      // User no longer logged in. Clean up state.
      clear();
    }
  }, [user, refetch, clear, dispatch]);

  // Set up receiving SSE events from the server.
  useEffect(() => {
    let eventSource: EventSource | null = null;
    if (user && eventToken && eventToken.token) {
      setEnablePolling(false);
      eventSource = new EventSource(`${environment.apiRoute}/events/${user!.id}/?token=${eventToken.token}`);

      eventSource.onmessage = message => {
        const payload = JSON.parse(message.data);
        addOneToFront(payload);

        // Grab the component for the notification type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Component = (NotificationComponents as any)[payload.type];
        // eslint-disable-next-line no-console
        console.assert(
          Component,
          `Could not find notification display component ${payload.type} in notifications/components.tsx\nMake sure to define a handler in that file`,
        );
        if (Component) {
          toast(<Component key={payload.id} notification={payload} />, {
            className: 'in-app-notification',
          });
        }
      };

      eventSource.onerror = () => {
        setEnablePolling(true);
      };
    }

    if (!user) {
      eventSource?.close();
    }

    return () => {
      eventSource?.close();
    };
  }, [user, eventToken, setEnablePolling, addOneToFront]);

  const notificationProviderValue = useMemo(() => {
    const result = {
      notifications: items,
      count,
      hasMore,
      isFetching,
      isLoading,
      remove,
      clear,
      getMore,
    };
    return result;
  }, [clear, remove, getMore, hasMore, items, count, isFetching, isLoading]);

  return notificationProviderValue;
};
