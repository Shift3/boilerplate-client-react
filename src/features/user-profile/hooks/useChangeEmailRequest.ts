import { useAppDispatch } from 'app/redux';
import { useCallback } from 'react';
import { authSlice, AuthState } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import {
  useRequestChangeEmailMutation,
  UserChangeEmailRequest,
  useCancelChangeEmailMutation,
} from 'common/api/userApi';
import * as authLocalStorage from '../../auth/authLocalStorage';

export const useCancelChangeEmailRequest = () => {
  const dispatch = useAppDispatch();
  const [cancelChangeEmail, { isLoading }] = useCancelChangeEmailMutation();

  const cancelChangeEmailRequest = useCallback(async () => {
    try {
      const updatedUser = await cancelChangeEmail().unwrap();
      const auth: AuthState | null = authLocalStorage.getAuthState();

      if (auth) {
        dispatch(authSlice.actions.userUpdatedProfile(updatedUser));
        authLocalStorage.saveAuthState({ ...auth, user: updatedUser });
        notificationService.showSuccessMessage('Email change request cancelled.');
      }
    } catch (error) {
      notificationService.showErrorMessage('Unable to cancel, try again later.');
      throw error;
    }
  }, [cancelChangeEmail, dispatch]);

  return { cancelChangeEmailRequest, isLoading };
};

export const useChangeEmailRequest = () => {
  const dispatch = useAppDispatch();
  const [requestChangeEmail] = useRequestChangeEmailMutation();

  const changeEmailRequest = useCallback(
    async (data: UserChangeEmailRequest) => {
      try {
        const updatedUser = await requestChangeEmail(data).unwrap();
        const auth: AuthState | null = authLocalStorage.getAuthState();

        if (auth) {
          dispatch(authSlice.actions.userUpdatedProfile(updatedUser));
          authLocalStorage.saveAuthState({ ...auth, user: updatedUser });
          notificationService.showSuccessMessage(
            'Email Verification sent. Follow the instructions in the email to proceed.',
          );
        }
      } catch (error) {
        notificationService.showErrorMessage('Unable to send email verification.');
        throw error;
      }
    },
    [requestChangeEmail, dispatch],
  );

  return { changeEmailRequest };
};
