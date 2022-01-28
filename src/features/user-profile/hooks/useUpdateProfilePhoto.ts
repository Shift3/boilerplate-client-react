import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'app/redux';
import { handleApiError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { authSlice } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useUpdateProfilePhotoMutation, UpdateProfilePhotoRequest } from 'common/api/userApi';
import { Image } from 'common/models';

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
