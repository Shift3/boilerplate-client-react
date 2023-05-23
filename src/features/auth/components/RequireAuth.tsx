import { RoleType } from 'common/models';
import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import * as notificationService from 'common/services/notification';
import { useTranslation } from 'react-i18next';

type RequireAuthProps = {
  allowedRoles?: RoleType[];
};

export const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({ children, allowedRoles = [] }) => {
  const { t } = useTranslation(['translation', 'common']);
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Redirect to login page, but save the current location they were
    // trying to go to. This allows us to send them back to that location
    // after they log in.
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }

  if (allowedRoles.length !== 0 && !allowedRoles.includes(auth.user.role)) {
    notificationService.showErrorMessage(t('notAuthorizedToView', { ns: 'common' }));
    return <Navigate to='/farms' replace />;
  }

  return <>{children}</>;
};
