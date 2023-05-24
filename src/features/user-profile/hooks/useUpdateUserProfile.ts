import { useAppDispatch } from 'app/redux';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { authSlice, AuthState } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useUpdateProfileMutation, UpdateProfileRequest } from 'common/api/userApi';
import * as authLocalStorage from '../../auth/authLocalStorage';
import { useTranslation } from 'react-i18next';

export type UseUpdateUserProfileHook = () => {
  updateUserProfile: (data: UpdateProfileRequest) => Promise<void>;
};

export const useUpdateUserProfile: UseUpdateUserProfileHook = () => {
  const dispatch = useAppDispatch();
  const [updateProfile] = useUpdateProfileMutation();
  const { t } = useTranslation(['translation', 'common']);

  const updateUserProfile = useCallback(
    async (data: UpdateProfileRequest) => {
      try {
        const updatedUser = await updateProfile(data).unwrap();
        const auth: AuthState | null = authLocalStorage.getAuthState();

        if (auth) {
          dispatch(authSlice.actions.userUpdatedProfile(updatedUser));
          authLocalStorage.saveAuthState({ ...auth, user: updatedUser });
          notificationService.showSuccessMessage(t('userServices.profileUpdated'));
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          handleApiError(error);
        } else {
          notificationService.showErrorMessage(t('userServices.unableToUpdateProfile'));
          throw error;
        }
      }
    },
    [updateProfile, dispatch, t],
  );

  return { updateUserProfile };
};
