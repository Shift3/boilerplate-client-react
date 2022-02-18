import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'app/redux';
import { handleApiError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { authSlice, AuthState } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useUpdateProfilePhotoMutation, UpdateProfilePhotoRequest } from 'common/api/userApi';
import * as authLocalStorage from '../../auth/authLocalStorage';

export type UseUpdateProfilePhotoHook = () => {
    updateUserProfilePhoto: (data: UpdateProfilePhotoRequest) => Promise<void>;
};

export const useUpdateProfilePhoto: UseUpdateProfilePhotoHook = () => {
    const dispatch = useAppDispatch();
    const [updateProfilePhoto] = useUpdateProfilePhotoMutation();

    const updateUserProfilePhoto = useCallback(
        async (data: UpdateProfilePhotoRequest) => {
            try {
                const updatedUser = await updateProfilePhoto(data).unwrap();
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
        [updateProfilePhoto, dispatch],
    );

    return { updateUserProfilePhoto };
};
