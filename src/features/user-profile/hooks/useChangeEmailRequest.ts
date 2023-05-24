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
import { useTranslation } from 'react-i18next';

export const useCancelChangeEmailRequest = () => {
  const dispatch = useAppDispatch();
  const [cancelChangeEmail, { isLoading }] = useCancelChangeEmailMutation();
  const { t } = useTranslation(['translation', 'common']);

  const cancelChangeEmailRequest = useCallback(async () => {
    try {
      const updatedUser = await cancelChangeEmail().unwrap();
      const auth: AuthState | null = authLocalStorage.getAuthState();

      if (auth) {
        dispatch(authSlice.actions.userUpdatedProfile(updatedUser));
        authLocalStorage.saveAuthState({ ...auth, user: updatedUser });
        notificationService.showSuccessMessage(t('userServices.emailChangeCancelled'));
      }
    } catch (error) {
      notificationService.showErrorMessage(t('userServices.unableToCancel'));
      throw error;
    }
  }, [cancelChangeEmail, dispatch, t]);

  return { cancelChangeEmailRequest, isLoading };
};

export const useChangeEmailRequest = () => {
  const dispatch = useAppDispatch();
  const [requestChangeEmail] = useRequestChangeEmailMutation();
  const { t } = useTranslation(['translation', 'common']);

  const changeEmailRequest = useCallback(
    async (data: UserChangeEmailRequest) => {
      try {
        const updatedUser = await requestChangeEmail(data).unwrap();
        const auth: AuthState | null = authLocalStorage.getAuthState();

        if (auth) {
          dispatch(authSlice.actions.userUpdatedProfile(updatedUser));
          authLocalStorage.saveAuthState({ ...auth, user: updatedUser });
          notificationService.showSuccessMessage(t('userServices.emailVerificationSent'));
        }
      } catch (error) {
        notificationService.showErrorMessage(t('userServices.unableToSendVerification'));
        throw error;
      }
    },
    [requestChangeEmail, dispatch, t],
  );

  return { changeEmailRequest };
};
