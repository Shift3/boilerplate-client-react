import { useAppDispatch } from 'app/redux';
import { useLogoutMutation } from 'common/api/authApi';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authLocalStorage from '../authLocalStorage';
import { authSlice } from '../authSlice';

export type UseLogoutHook = () => { logout: () => Promise<void>; isLoading: boolean };

export const useLogout: UseLogoutHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [isLoading, setIsLoading] = useState(false);

  const logoutUser = useCallback(async () => {
    setIsLoading(true);

    try {
      await logout();
    } catch (error) {
      // Nothing to do right now. Whether the api call succeeds or fails, we clear the auth state and
      // navigate to the login page the same way, which is handled in the finally block.
    } finally {
      dispatch(authSlice.actions.userLoggedOut());
      authLocalStorage.clearAuthState();
      setIsLoading(false);
      navigate('/auth/login', { replace: true });
    }
  }, [logout, dispatch, navigate, setIsLoading]);

  return { logout: logoutUser, isLoading };
};
