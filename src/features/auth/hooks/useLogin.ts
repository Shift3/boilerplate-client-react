import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'app/redux';
import { useLoginMutation } from 'common/api/authApi';
import { handleApiError } from 'common/api/handleApiError';
import { ErrorResponse } from 'common/models';
import * as notificationService from 'common/services/notification';
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
  const [login, { isLoading }] = useLoginMutation();

  const loginUser = useCallback(
    async (credentials: Credentials) => {
      try {
        const { jwtToken: token, user } = await login(credentials).unwrap();
        const auth = { token, user };
        dispatch(authSlice.actions.userLoggedIn(auth));
        authLocalStorage.saveAuthState(auth);
        history.replace('/agents');
      } catch (error) {
        handleApiError(error as FetchBaseQueryError);
      }
    },
    [login, dispatch, history],
  );

  return { login: loginUser, isLoading };
};
