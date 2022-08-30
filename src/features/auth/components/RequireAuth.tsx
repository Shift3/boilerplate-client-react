import { RoleType } from 'common/models';
import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import * as notificationService from 'common/services/notification';

type RequireAuthProps = {
  allowedRoles?: RoleType[];
};

export const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({ children, allowedRoles = [] }) => {
  const auth = useAuth();
  const location = useLocation();

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
