import { useShowNotification } from 'core/modules/notifications/application';
import { useAppDispatch } from 'core/redux';
import { useCallback } from 'react';
import { ISession } from '../domain/session';
import { AuthApiService } from '../infrastructure/http/authApiService';
import { SessionResponse } from '../infrastructure/http/dtos';
import { saveSession } from '../infrastructure/store/auth.localStorage';
import authSlice from '../infrastructure/store/authSlice';

export type LoginCredentials = {
  email: string;
  password: string;
};

export interface ILoginAction {
  loginWithEmailAndPassword: (
    credentials: LoginCredentials,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ) => Promise<void>;
}

export const useLoginAction = (): ILoginAction => {
  const dispatch = useAppDispatch();
  const { showErrorNotification } = useShowNotification();

  const loginWithEmailAndPassword = useCallback(
    async (credentials: LoginCredentials, onSuccess?: CallableFunction, onError?: CallableFunction) => {
      const authService = new AuthApiService();
      const payload = { ...credentials };

      try {
        const { jwtToken, user }: SessionResponse = await authService.login(payload);
        const session: ISession = { token: jwtToken, user };
        saveSession(session);
        dispatch(authSlice.actions.setSession(session));

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        showErrorNotification(error.message);

        if (onError) {
          onError();
        }
      }
    },
    [dispatch, showErrorNotification],
  );

  return { loginWithEmailAndPassword };
};
