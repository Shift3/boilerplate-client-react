import { useAppDispatch } from 'app/redux';
import { useLoginMutation } from 'common/api/authApi';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authLocalStorage from '../authLocalStorage';
import { authSlice } from '../authSlice';
import * as notificationService from 'common/services/notification';
import { getMeta, getNotifications, getResults } from 'features/notification/utility/utilities';
import { useNotifications } from 'features/notification/hooks/useNotifications';

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
  const { setUnread, setRead, setUnreadMeta, setReadMeta, setTotalUnread, setTotalRead } = useNotifications();

  const loginUser = useCallback(
    async (credentials: Credentials) => {
      try {
        const session = await login(credentials).unwrap();
        document.cookie = `x-auth-token=${session.token}; path=/; SameSite=None; Secure`;
        const auth = { token: session.token, user: session.user };
        dispatch(authSlice.actions.userLoggedIn(auth));
        authLocalStorage.saveAuthState(auth);
        const unreadData = await getNotifications({ cursorLink: '' }, 'unread', auth.token);
        console.log('unreadData:', unreadData);
        setUnread(getResults(unreadData) ?? []);
        setUnreadMeta(getMeta(unreadData));
        const readData = await getNotifications({ cursorLink: '' }, 'read', auth.token);
        console.log('readData:', readData);
        setUnread(getResults(readData) ?? []);
        setReadMeta(getMeta(readData));
        navigate('/agents', { replace: true });
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          handleApiError(error);
        } else {
          notificationService.showErrorMessage('Unable to log in.');
          throw error;
        }
      }
    },
    [login, dispatch, navigate, setUnread, setUnreadMeta, setReadMeta],
  );

  return { login: loginUser, isLoading };
};
