import { useAppDispatch } from 'app/redux';
import { useLogoutMutation } from 'common/api/authApi';
import { useNotifications } from 'features/notification/hooks/useNotifications';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authLocalStorage from '../authLocalStorage';
import { authSlice } from '../authSlice';

export type UseLogoutHook = () => { logout: () => Promise<void>; isLoading: boolean };

export const useLogout: UseLogoutHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const { setUnread, setRead, setUnreadMeta, setReadMeta, setTotalRead, setTotalUnread } = useNotifications();

  const logoutUser = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      // Nothing to do right now. Whether the api call succeeds or fails, we clear the auth state and
      // navigate to the login page the same way, which is handled in the finally block.
    } finally {
      document.cookie = '';
      dispatch(authSlice.actions.userLoggedOut());
      authLocalStorage.clearAuthState();
      setUnread([]);
      setRead([]);
      setUnreadMeta(null);
      setReadMeta(null);
      setTotalRead(0);
      setTotalUnread(0);
      navigate('/auth/login', { replace: true });
    }
  }, [logout, dispatch, navigate, setUnread, setRead, setUnreadMeta, setReadMeta, setTotalRead, setTotalUnread]);

  return { logout: logoutUser, isLoading };
};
