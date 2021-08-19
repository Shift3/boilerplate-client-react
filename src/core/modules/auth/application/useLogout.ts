// React imports
import { useCallback } from 'react';

// App imports
import store from 'app/redux/store';
import { useAppDispatch } from 'app/redux';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { AuthService } from '../infrastructure/http/authService';
import { AuthLocalStorage } from '../infrastructure/store/authLocalStorage';
import authSlice, { selectSession } from '../infrastructure/store/authSlice';

export interface ILogoutFacade {
  /**
   * Logout user and clear stored session.
   *
   * If logout fails, an error notification is shown.
   *
   * @param {CallableFunction} onSuccess - An optional callback function to be called if logout is successful.
   * @param {CallableFunction} onError - An optional callback function to be called if logout fails.
   */
  logoutUser: (onSuccess?: CallableFunction, onError?: CallableFunction) => Promise<void>;
}

/**
 * Custom hook that returns an ILogoutFacade.
 */
export const useLogout = (): ILogoutFacade => {
  const dispatch = useAppDispatch();
  const { showErrorNotification } = useShowNotification();

  const logoutUser = useCallback(
    async (onSuccess?: CallableFunction, onError?: CallableFunction): Promise<void> => {
      const authApiService = new AuthService();
      const session = selectSession(store.getState());

      try {
        await authApiService.logout(session?.token ?? '');

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        showErrorNotification(error.message);

        if (onError) {
          onError();
        }
      } finally {
        // Regardless of whether there is an error or not, we need to clear the session on the client.
        AuthLocalStorage.clearSession();
        dispatch(authSlice.actions.clearSession());
      }
    },
    [dispatch, showErrorNotification],
  );

  return {
    logoutUser,
  };
};
