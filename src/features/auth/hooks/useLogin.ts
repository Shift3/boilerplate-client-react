import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'app/redux';
import { useLoginMutation } from 'common/api/authApi';
import { ErrorResponse } from 'common/models';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as authLocalStorage from '../authLocalStorage';
import { authSlice } from '../authSlice';

export interface Credentials {
  email: string;
  password: string;
}

export type UseLoginHook = () => {
  login: (credentials: Credentials) => Promise<void>;
  isLoading: boolean;
};

export const useLogin: UseLoginHook = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { showErrorNotification } = useShowNotification();
  const [login, { isLoading }] = useLoginMutation();

  const loginUser = useCallback(
    async (credentials: Credentials) => {
      try {
        const session = await login(credentials).unwrap();
        const { jwtToken: token, user } = session;
        const auth = { token, user };
        dispatch(authSlice.actions.userLoggedIn(auth));
        authLocalStorage.saveAuthState(auth);
        history.replace('/agents');
      } catch (error) {
        const fetchError = error as FetchBaseQueryError;

        if ('data' in fetchError) {
          const { data } = fetchError;
          const { message } = data as ErrorResponse;
          showErrorNotification(message);
        } else if (!navigator.onLine) {
          showErrorNotification('No Internet Connection.');
        } else {
          showErrorNotification('Unable to complete request');
        }
      }
    },
    [login, dispatch, history, showErrorNotification],
  );

  return { login: loginUser, isLoading };
};
