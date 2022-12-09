import { notificationApi, useGetEventTokenQuery, useGetUnreadNotificationsQuery } from 'common/api/notificationApi';
import { AppNotification } from 'common/models/notifications';
import { environment } from 'environment';
import { useAuth } from 'features/auth/hooks';
import * as NotificationComponents from 'features/notifications/components';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

type State = {
  notifications: AppNotification[];
  oldNotifications: AppNotification[];
  nextNotificationUrl: string | null;
  count: number;
};

const initialState: State = {
  notifications: [],
  oldNotifications: [],
  nextNotificationUrl: null,
  count: 0,
};

type Action =
  | { type: 'add'; notification: AppNotification }
  | { type: 'add-old'; notifications: AppNotification[]; count: number }
  | { type: 'set-next-notification-url'; nextNotificationUrl: string | null }
  | { type: 'remove'; notification: AppNotification }
  | { type: 'reset' };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'add':
      return { ...state, notifications: [action.notification, ...state.notifications] };
    case 'add-old':
      return { ...state, oldNotifications: [...state.oldNotifications, ...action.notifications], count: action.count };
    case 'remove': {
      const notifications = state.notifications.filter(n => n.id !== action.notification.id);
      const oldNotifications = state.oldNotifications.filter(n => n.id !== action.notification.id);
      let numRemoved = state.notifications.length - notifications.length;
      numRemoved += state.oldNotifications.length - oldNotifications.length;

      return {
        ...state,
        notifications,
        oldNotifications,
        count: state.count - numRemoved,
      };
    }
    case 'reset':
      return { ...initialState };
    case 'set-next-notification-url':
      return { ...state, nextNotificationUrl: action.nextNotificationUrl };
    default:
      return { ...initialState };
  }
};

export const useLiveNotifications = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [{ notifications, oldNotifications, nextNotificationUrl, count }, notificationDispatch] = useReducer(
    reducer,
    initialState,
  );
  const {
    data: unreadNotifications,
    isFetching,
    isLoading,
    refetch,
  } = useGetUnreadNotificationsQuery(nextNotificationUrl, {
    skip: !user,
  });

  const [enablePolling, setEnablePolling] = useState(true);
  const { data: eventToken } = useGetEventTokenQuery(undefined, {
    skip: !user,
    pollingInterval: enablePolling ? 3000 : 0,
  });

  // Append new notifications that we got from the API to
  // oldNotifications list
  useEffect(() => {
    notificationDispatch({
      type: 'add-old',
      notifications: unreadNotifications?.results || [],
      count: unreadNotifications?.meta.count || 0,
    });
  }, [unreadNotifications]);

  useEffect(() => {
    if (user) {
      refetch();
    } else {
      // User no longer logged in. Clean up state.
      dispatch(notificationApi.util.resetApiState());
      notificationDispatch({ type: 'reset' });
    }
  }, [user, refetch, notificationDispatch, dispatch]);

  // Set up receiving SSE events from the server.
  useEffect(() => {
    let eventSource: EventSource | null = null;
    if (user && eventToken && eventToken.token) {
      setEnablePolling(false);
      eventSource = new EventSource(`${environment.apiRoute}/events/${user!.id}/?token=${eventToken.token}`);

      eventSource.onmessage = message => {
        const payload = JSON.parse(message.data);
        notificationDispatch({ type: 'add', notification: payload });

        // Grab the component for the notification type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Component = (NotificationComponents as any)[payload.type];
        // eslint-disable-next-line no-console
        console.assert(
          Component,
          `Could not find notification display component ${payload.type} in notifications/components.tsx\nMake sure to define a handler in that file`,
        );
        if (Component) {
          toast(<Component key={payload.id} notification={payload} />, { className: 'in-app-notification' });
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
  }, [user, eventToken, setEnablePolling]);

  const clear = useCallback(() => {
    notificationDispatch({ type: 'reset' });
    dispatch(notificationApi.util.resetApiState());
  }, [notificationDispatch, dispatch]);

  const remove = useCallback(
    (notification: AppNotification) => {
      notificationDispatch({ type: 'remove', notification });
    },
    [notificationDispatch],
  );

  const getMore = useCallback(() => {
    if (unreadNotifications?.links.next && !isFetching) {
      notificationDispatch({ type: 'set-next-notification-url', nextNotificationUrl: unreadNotifications.links.next });
    }
  }, [notificationDispatch, isFetching, unreadNotifications]);

  const notificationProviderValue = useMemo(() => {
    const result = {
      notifications: [...notifications, ...oldNotifications],
      count: notifications.length + count, // I'm not so sure this is right.
      hasMore: !!unreadNotifications?.links.next,
      isFetching,
      isLoading,
      remove,
      clear,
      getMore,
    };
    return result;
  }, [clear, remove, getMore, notifications, unreadNotifications, count, oldNotifications, isFetching, isLoading]);

  return notificationProviderValue;
};
