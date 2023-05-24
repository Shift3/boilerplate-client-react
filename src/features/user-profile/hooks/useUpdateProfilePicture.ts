import { useAppDispatch } from 'app/redux';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { authSlice, AuthState } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useUpdateProfilePictureMutation, UpdateProfilePictureRequest } from 'common/api/userApi';
import * as authLocalStorage from '../../auth/authLocalStorage';
import { isObject, isStringArray, isKeyOfObject } from 'common/error/utilities';
import { StatusCodes } from 'http-status-codes';
import { useTranslation } from 'react-i18next';

export const useUpdateProfilePicture = () => {
  const dispatch = useAppDispatch();
  const [updateProfilePicture, { isLoading }] = useUpdateProfilePictureMutation();
  const { t } = useTranslation(['translation', 'common']);

  const updateUserProfilePicture = useCallback(
    async (data: UpdateProfilePictureRequest) => {
      try {
        const updatedUser = await updateProfilePicture(data).unwrap();
        const auth: AuthState | null = authLocalStorage.getAuthState();
        const { profilePicture } = updatedUser;

        if (profilePicture && auth) {
          dispatch(authSlice.actions.userUpdatedProfilePicture(profilePicture));
          authLocalStorage.saveAuthState({ ...auth, user: updatedUser });
          notificationService.showSuccessMessage(t('userServices.profilePhotoUpdated'));
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          if (error.status === StatusCodes.REQUEST_TOO_LONG) {
            notificationService.showErrorMessage(t('userServices.fileTooLarge'));
          } else if (error.data && isObject(error.data) && isKeyOfObject('file', error.data)) {
            const fileErrorMessages = error.data.file;
            if (isStringArray(fileErrorMessages)) {
              notificationService.showErrorMessage(fileErrorMessages.join(' '));
            }
          } else {
            handleApiError(error);
          }
        } else {
          notificationService.showErrorMessage(t('userServices.unableToUploadPhoto'));
          throw error;
        }
      }
    },
    [updateProfilePicture, dispatch, t],
  );

  return { updateUserProfilePicture, isLoading };
};
