import { FC, PropsWithChildren, useState } from 'react';
import { useGetMeQuery } from 'common/api/userApi';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { useLogout } from '../hooks';
import { StatusCodes } from 'http-status-codes';
import { getAuthState } from '../authLocalStorage';

export const AccountChecker: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [accountHasIssue, setAccountHasIssue] = useState(false);
  const { data, error } = useGetMeQuery({}, { pollingInterval: 5000, skip: accountHasIssue });

  const localAuth = getAuthState();

  console.log('localAuth:', localAuth);
  console.log('data:', data);
  console.log('error:', error);

  if (localAuth && error) {
    if (isFetchBaseQueryError(error)) {
      if (error.status === StatusCodes.FORBIDDEN) {
        setAccountHasIssue(true);
      }
    }
  }

  return !accountHasIssue ? <>{children}</> : <p>Problem Page</p>;
};
