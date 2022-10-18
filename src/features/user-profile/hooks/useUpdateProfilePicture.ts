import { useAppDispatch } from 'app/redux';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { authSlice, AuthState } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useUpdateProfilePictureMutation, UpdateProfilePictureRequest } from 'common/api/userApi';
import * as authLocalStorage from '../../auth/authLocalStorage';
import { isObject, isStringArray } from 'common/error/utilities';

export function isKeyOfObject<T>(key: string | number | symbol, obj: T): key is keyof T {
  return key in obj;
}

export const useUpdateProfilePicture = () => {
  const dispatch = useAppDispatch();
  const [updateProfilePicture, { isLoading }] = useUpdateProfilePictureMutation();

  const updateUserProfilePicture = useCallback(
    async (data: UpdateProfilePictureRequest) => {
      try {
        const updatedUser = await updateProfilePicture(data).unwrap();
        const auth: AuthState | null = authLocalStorage.getAuthState();
        const { profilePicture } = updatedUser;

        if (profilePicture && auth) {
          dispatch(authSlice.actions.userUpdatedProfilePicture(profilePicture));
          authLocalStorage.saveAuthState({ ...auth, user: updatedUser });
          notificationService.showSuccessMessage('Profile Photo Updated');
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          if (error.data && isObject(error.data) && isKeyOfObject('file', error.data)) {
            const fileErrorMessages = error.data.file;
            if (isStringArray(fileErrorMessages)) {
              notificationService.showErrorMessage(fileErrorMessages.join(' '));
            }
          } else {
            handleApiError(error);
          }
        } else {
          notificationService.showErrorMessage('Unable to upload profile picture.');
          throw error;
        }
      }
    },
    [updateProfilePicture, dispatch],
  );

  return { updateUserProfilePicture, isLoading };
};
