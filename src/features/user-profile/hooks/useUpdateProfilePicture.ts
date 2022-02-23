import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'app/redux';
import { handleApiError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { authSlice, AuthState } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useUpdateProfilePictureMutation, UpdateProfilePictureRequest } from 'common/api/userApi';
import * as authLocalStorage from '../../auth/authLocalStorage';

export type UseUpdateProfilePictureHook = () => {
    updateUserProfilePicture: (data: UpdateProfilePictureRequest) => Promise<void>;
};

export const useUpdateProfilePicture: UseUpdateProfilePictureHook = () => {
    const dispatch = useAppDispatch();
    const [updateProfilePicture] = useUpdateProfilePictureMutation();

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
                handleApiError(error as FetchBaseQueryError);
            }
        },
        [updateProfilePicture, dispatch],
    );

    return { updateUserProfilePicture };
};
