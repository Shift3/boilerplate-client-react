import { useAppDispatch } from 'app/redux';
import { useLogoutMutation } from 'common/api/authApi';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as authLocalStorage from '../authLocalStorage';
import { authSlice } from '../authSlice';

export type UseLogoutHook = () => { logout: () => Promise<void>; isLoading: boolean };

export const useLogout: UseLogoutHook = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const logoutUser = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      // Nothing to do right now. Whether the api call succeeds or fails, we clear the auth state and
      // navigate to the login page the same way, which is handled in the finally block.
    } finally {
      dispatch(authSlice.actions.userLoggedOut());
      authLocalStorage.clearAuthState();
    }
  }, [logout, dispatch, history]);

  return { logout: logoutUser, isLoading };
};
