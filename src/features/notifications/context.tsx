import { notificationApi } from 'common/api/notificationApi';
import { AppNotification } from 'common/models/notifications';
import { useAuth } from 'features/auth/hooks';
import { createContext, FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLiveNotifications } from './hooks/useLiveNotifications';

export const NotificationContext = createContext<{
  notifications: AppNotification[];
  count: number;
  hasMore: boolean;
  isFetching: boolean;
  isLoading: boolean;
  getMore: () => void;
  clear: () => void;
}>({
  notifications: [],
  count: 0,
  hasMore: false,
  isFetching: false,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getMore: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clear: () => {},
});

export const NotificationsProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const notificationProviderValue = useLiveNotifications();

  return <NotificationContext.Provider value={notificationProviderValue}>{children}</NotificationContext.Provider>;
};
