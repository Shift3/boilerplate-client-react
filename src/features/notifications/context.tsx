import { AppNotification } from 'common/models/notifications';
import { createContext, FC, PropsWithChildren } from 'react';
import { useLiveNotifications } from './hooks/useLiveNotifications';

export const NotificationContext = createContext<{
  notifications: AppNotification[];
  count: number;
  hasMore: boolean;
  isFetching: boolean;
  isLoading: boolean;
  getMore: () => void;
  clear: () => void;
  remove: (notification: AppNotification) => void;
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove: () => {},
});

export const NotificationsProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const notificationProviderValue = useLiveNotifications();

  return <NotificationContext.Provider value={notificationProviderValue}>{children}</NotificationContext.Provider>;
};
