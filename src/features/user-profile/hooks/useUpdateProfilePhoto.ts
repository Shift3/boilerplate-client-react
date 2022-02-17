import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'app/redux';
import { handleApiError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { authSlice, AuthState } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useUpdateProfilePhotoMutation, UpdateProfilePhotoRequest } from 'common/api/userApi';
import { Image } from 'common/models';
import * as authLocalStorage from '../../auth/authLocalStorage';

export type UseUpdateProfilePhotoHook = () => {
    updateUserProfilePhoto: (data: UpdateProfilePhotoRequest) => Promise<void>;
};

export const useUpdateProfilePhoto: UseUpdateProfilePhotoHook = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [updateProfilePhoto] = useUpdateProfilePhotoMutation();

    const updateUserProfilePhoto = useCallback(
        async (data: UpdateProfilePhotoRequest) => {
            try {
                const updatedUser = await updateProfilePhoto(data).unwrap();
                dispatch(authSlice.actions.userUpdatedProfilePicture(updatedUser.profilePicture as Image));
                authLocalStorage.saveAuthState({ ...authLocalStorage.getAuthState(), user: updatedUser } as AuthState);
                notificationService.showSuccessMessage('Profile Photo Updated');
                history.replace('/agents');
            } catch (error) {
                handleApiError(error as FetchBaseQueryError);
            }
        },
        [updateProfilePhoto, dispatch, history],
    );

    return { updateUserProfilePhoto };
};
