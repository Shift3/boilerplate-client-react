import { RoleType } from 'common/models';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import * as notificationService from 'common/services/notification';
import { useGetReadQuery, useGetUnreadQuery } from 'common/api/notificationApi';
import { getCount, getMeta } from 'features/notification/utility/utilities';
import { useNotifications } from 'features/notification/hooks/useNotifications';

type RequireAuthProps = {
  allowedRoles?: RoleType[];
};

export const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({ children, allowedRoles = [] }) => {
  const auth = useAuth();
  const location = useLocation();
  const { data: unreadData } = useGetUnreadQuery(undefined, { skip: !auth.user });
  const { data: readData } = useGetReadQuery(undefined, { skip: !auth.user });
  // const { setTotalUnread, setTotalRead, setUnreadMeta, setReadMeta } = useNotifications();
  const { notificationDispatch } = useNotifications();

  useEffect(() => {
    // setTotalUnread(getCount(unreadData) ?? 0);
    // setUnreadMeta(getMeta(unreadData));
    // setTotalRead(getCount(readData) ?? 0);
    // setReadMeta(getMeta(readData));
    notificationDispatch({
      type: 'set all non-list data',
      totalUnreadCount: getCount(unreadData) ?? undefined,
      totalReadCount: getCount(readData) ?? undefined,
      unreadMetaObject: getMeta(unreadData) ?? undefined,
      readMetaObject: getMeta(readData) ?? undefined,
    });
  }, [readData, unreadData, notificationDispatch]);

  if (!auth.user) {
    // Redirect to login page, but save the current location they were
    // trying to go to. This allows us to send them back to that location
    // after they log in.
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }

  if (allowedRoles.length !== 0 && !allowedRoles.includes(auth.user.role)) {
    notificationService.showErrorMessage('Not authorized to view the requested page.');
    return <Navigate to='/agents' replace />;
  }

  return <>{children}</>;
};
