import { FC, PropsWithChildren, useState } from 'react';
import { useGetMeQuery } from 'common/api/userApi';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { StatusCodes } from 'http-status-codes';
import { getAuthState } from '../authLocalStorage';
import { AccountProblemPage } from '../pages/AccountProblemPage';

export const AccountChecker: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [accountHasIssue, setAccountHasIssue] = useState(false);
  const { data, error } = useGetMeQuery({}, { pollingInterval: 5000, skip: accountHasIssue });
  const localAuth = getAuthState();

  console.log('localAuth:', localAuth);
  console.log('data:', data);
  console.log('error:', error);
  console.log('accountHasIssue:', accountHasIssue);

  if (localAuth && error) {
    if (isFetchBaseQueryError(error)) {
      if (error.status === StatusCodes.FORBIDDEN) {
        setAccountHasIssue(true);
      }
    }
  }

  return !accountHasIssue && data ? <>{children}</> : <AccountProblemPage />;
};
