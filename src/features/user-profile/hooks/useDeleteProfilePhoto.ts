import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'app/redux';
import { handleApiError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { authSlice } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useDeleteProfilePhotoMutation, DeleteProfilePhotoRequest } from 'common/api/userApi';


export type UseDeleteProfilePhotoHook = () => {
    deleteUserProfilePhoto: (data: DeleteProfilePhotoRequest) => Promise<void>;
};

export const useDeleteProfilePhoto: UseDeleteProfilePhotoHook = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [deleteProfilePhoto] = useDeleteProfilePhotoMutation();

    const deleteUserProfilePhoto = useCallback(
        async (data: DeleteProfilePhotoRequest) => {
            try {
                await deleteProfilePhoto(data).unwrap();
                dispatch(authSlice.actions.userUpdatedProfilePicture(null));
                notificationService.showSuccessMessage('Profile Photo Deleted');
                history.replace('/agents');
            } catch (error) {
                handleApiError(error as FetchBaseQueryError);
            }
        },
        [deleteProfilePhoto, dispatch, history],
    );

    return { deleteUserProfilePhoto };
};
