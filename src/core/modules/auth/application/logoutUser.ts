import { useShowNotification } from 'core/modules/notifications/application';
import { useAppDispatch } from 'core/redux';
import store from 'core/redux/store';
import { useCallback } from 'react';
import { AuthApiService } from '../infrastructure/http/authApiService';
import { clearSession } from '../infrastructure/store/auth.localStorage';
import authSlice, { selectSession } from '../infrastructure/store/authSlice';

export interface ILogoutAction {
  logoutUser: () => Promise<void>;
}

export const useLogoutAction = (): ILogoutAction => {
  const dispatch = useAppDispatch();
  const { showErrorNotification } = useShowNotification();

  const logoutUser = useCallback(async (): Promise<void> => {
    const authApiService = new AuthApiService();
    const session = selectSession(store.getState());
    try {
      await authApiService.logout(session?.token ?? '');
    } catch (error) {
      showErrorNotification(error.message);
    } finally {
      // Regardless of whether there is an error or not, we need to clear the session on the client.
      clearSession();
      dispatch(authSlice.actions.clearSession());
    }
  }, [dispatch, showErrorNotification]);

  return {
    logoutUser,
  };
};
