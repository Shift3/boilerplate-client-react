import { useGetReadNotificationsQuery } from 'common/api/notificationApi';
import { useInfiniteLoading } from 'common/hooks/useInfiniteLoading';
import { PaginatedResult } from 'common/models';
import { AppNotification } from 'common/models/notifications';
import { createContext, FC, PropsWithChildren } from 'react';

export const ReadNotificationsContext = createContext<{
  loadedData: AppNotification[];
  hasMore: boolean;
  isFetching: boolean;
  isLoading: boolean;
  error: unknown;
  totalCount: number | undefined;
  fetchMore: () => void;
}>({
  loadedData: [],
  hasMore: false,
  isFetching: false,
  isLoading: false,
  error: {},
  totalCount: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchMore: () => {},
});

export const ReadNotificationsProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const notificationProviderValue = useInfiniteLoading<AppNotification, PaginatedResult<AppNotification>>(
    '',
    true,
    useGetReadNotificationsQuery,
  );

  return (
    <ReadNotificationsContext.Provider value={notificationProviderValue}>{children}</ReadNotificationsContext.Provider>
  );
};
