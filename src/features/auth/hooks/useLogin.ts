import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'app/redux';
import { useLoginMutation } from 'common/api/authApi';
import { handleApiError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const loginUser = useCallback(
    async (credentials: Credentials) => {
      try {
        const session = await login(credentials).unwrap();
        const auth = { token: session.token, user: session.user };
        dispatch(authSlice.actions.userLoggedIn(auth));
        authLocalStorage.saveAuthState(auth);
        navigate('/agents', { replace: true });
      } catch (error) {
        handleApiError(error as FetchBaseQueryError);
        throw error;
      }
    },
    [login, dispatch, navigate],
  );

  return { login: loginUser, isLoading };
};
