import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'app/redux';
import { handleApiError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { authSlice, AuthState } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useDeleteProfilePhotoMutation, DeleteProfilePhotoRequest } from 'common/api/userApi';
import * as authLocalStorage from '../../auth/authLocalStorage';

export type UseDeleteProfilePhotoHook = () => {
    deleteUserProfilePhoto: (data: DeleteProfilePhotoRequest) => Promise<void>;
};

export const useDeleteProfilePhoto: UseDeleteProfilePhotoHook = () => {
    const dispatch = useAppDispatch();
    const [deleteProfilePhoto] = useDeleteProfilePhotoMutation();

    const getUserWithNullProfilePicture = () => {
        const user = authLocalStorage.getAuthState()?.user ?? null;
        if (user)
            user.profilePicture = null;

        return user;
    }

    const deleteUserProfilePhoto = useCallback(
        async (data: DeleteProfilePhotoRequest) => {
            try {
                await deleteProfilePhoto(data).unwrap();
                dispatch(authSlice.actions.userUpdatedProfilePicture(null));
                authLocalStorage.saveAuthState({ ...authLocalStorage.getAuthState(), user: getUserWithNullProfilePicture() } as AuthState);
                notificationService.showSuccessMessage('Profile Photo Deleted');
            } catch (error) {
                handleApiError(error as FetchBaseQueryError);
            }
        },
        [deleteProfilePhoto, dispatch],
    );

    return { deleteUserProfilePhoto };
};
