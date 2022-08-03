import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useGetMeQuery } from 'common/api/userApi';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { useLogout } from '../hooks';
import { StatusCodes } from 'http-status-codes';

export const AccountChecker: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [accountHasIssue, setAccountHasIssue] = useState(false);
  const { data, error } = useGetMeQuery({}, { pollingInterval: 5000 });

  console.log('data:', data);
  console.log('error:', error);

  useEffect(() => {
    if (error && accountHasIssue) {
      if (isFetchBaseQueryError(error)) {
        if (error.status === StatusCodes.FORBIDDEN) {
          setAccountHasIssue(true);
        }
      }
    }
  }, [error]);

  return !accountHasIssue ? <>{children}</> : <p>Problem Page</p>;
};
