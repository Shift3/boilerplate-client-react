import { useAppDispatch } from 'app/redux';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { authSlice, AuthState } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useDeleteProfilePictureMutation, DeleteProfilePictureRequest } from 'common/api/userApi';
import * as authLocalStorage from '../../auth/authLocalStorage';

export type UseDeleteProfilePictureHook = () => {
  deleteUserProfilePicture: (data: DeleteProfilePictureRequest) => Promise<void>;
};

export const useDeleteProfilePicture: UseDeleteProfilePictureHook = () => {
  const dispatch = useAppDispatch();
  const [deleteProfilePicture] = useDeleteProfilePictureMutation();

  const getUserWithNullProfilePicture = () => {
    const user = authLocalStorage.getAuthState()?.user ?? null;
    if (user) user.profilePicture = null;

    return user;
  };

  const deleteUserProfilePicture = useCallback(
    async (data: DeleteProfilePictureRequest) => {
      try {
        await deleteProfilePicture(data).unwrap();
        const auth: AuthState | null = authLocalStorage.getAuthState();

        if (auth) {
          dispatch(authSlice.actions.userUpdatedProfilePicture(null));
          authLocalStorage.saveAuthState({ ...auth, user: getUserWithNullProfilePicture() });
          notificationService.showSuccessMessage('Profile Photo Deleted');
        }
      } catch (error) {
        notificationService.showErrorMessage('Unable to delete profile picture.');
        if (isFetchBaseQueryError(error)) {
          handleApiError(error);
        } else {
          throw error;
        }
      }
    },
    [deleteProfilePicture, dispatch],
  );

  return { deleteUserProfilePicture };
};
