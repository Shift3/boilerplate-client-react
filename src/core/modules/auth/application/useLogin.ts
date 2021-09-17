// React imports
import { useCallback } from 'react';

// App imports
import { useAppDispatch } from 'app/redux';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { ISession } from '../domain/session';
import { AuthService } from '../infrastructure/http/authService';
import { AuthLocalStorage } from '../infrastructure/store/authLocalStorage';
import authSlice from '../infrastructure/store/authSlice';

export type LoginCredentials = {
  email: string;
  password: string;
};

export interface ILoginFacade {
  /**
   * Log in user with email and password credentials.
   *
   * If login is successful, the session data is saved in local storage and in the in-memory store. Otherwise,
   * if login fails, an error notification is shown and all stored session data is cleared.
   *
   * @param {LoginCredentials} credentials - The required credential data to log in.
   * @param {CallableFunction} onSuccess - An optional callback function to be called if login is successful.
   * @param {CallableFunction} onError - An optional callback function to be called if login fails.
   */
  loginUser: (credentials: LoginCredentials, onSuccess?: CallableFunction, onError?: CallableFunction) => Promise<void>;
}

/**
 * Custom hook that returns an ILoginFacade.
 */
export const useLogin = (): ILoginFacade => {
  const dispatch = useAppDispatch();
  const { showErrorNotification } = useShowNotification();

  const loginWithEmailAndPassword = useCallback(
    async (credentials: LoginCredentials, onSuccess?: CallableFunction, onError?: CallableFunction) => {
      const authService = new AuthService();
      const payload = { ...credentials };

      try {
        const { jwtToken, user } = await authService.login(payload);
        const session: ISession = { token: jwtToken, user };
        AuthLocalStorage.saveSession(session);
        dispatch(authSlice.actions.setSession(session));

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        showErrorNotification(error.message);

        // If there is any error while logging in, clear all saved session data.
        AuthLocalStorage.clearSession();
        dispatch(authSlice.actions.clearSession());

        if (onError) {
          onError();
        }
      }
    },
    [dispatch, showErrorNotification],
  );

  return { loginUser: loginWithEmailAndPassword };
};
