import { RoleType } from 'common/models';
import { FC, PropsWithChildren, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import * as notificationService from 'common/services/notification';
import { useGetMeQuery } from 'common/api/userApi';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { StatusCodes } from 'http-status-codes';
import { clearAuthState } from '../authLocalStorage';
import { useDispatch } from 'react-redux';
import { authSlice } from '../authSlice';

type RequireAuthProps = {
  allowedRoles?: RoleType[];
};

export const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({ children, allowedRoles = [] }) => {
  const auth = useAuth();
  const location = useLocation();
  const [accountHasIssue, setAccountHasIssue] = useState(false);
  const { error } = useGetMeQuery({}, { pollingInterval: 5000, skip: accountHasIssue });
  const dispatch = useDispatch();

  console.log('auth:', auth);
  console.log('accountHasIssue:', accountHasIssue);
  console.log('error:', error);

  if (auth.user && error) {
    if (isFetchBaseQueryError(error)) {
      if (error.status === StatusCodes.FORBIDDEN) {
        setAccountHasIssue(true);
      }
    }
  }

  if (!auth.user || accountHasIssue) {
    if (accountHasIssue) {
      notificationService.showEndlessErrorMessage(
        'There is a problem with your account. Please contact the administrators of this site.',
      );
      dispatch(authSlice.actions.userLoggedOut());
      clearAuthState();
    }
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
