import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'app/redux';
import { handleApiError } from 'common/api/handleApiError';
import { useCallback } from 'react';
import { authSlice, AuthState } from '../../auth/authSlice';
import * as notificationService from 'common/services/notification';
import { useUpdateProfileMutation, UpdateProfileRequest } from 'common/api/userApi';
import * as authLocalStorage from '../../auth/authLocalStorage';

export type UseUpdateProfileHook = () => {
    updateUserProfile: (data: UpdateProfileRequest) => Promise<void>;
};

export const useUpdateProfile: UseUpdateProfileHook = () => {
    const dispatch = useAppDispatch();
    const [updateProfile] = useUpdateProfileMutation();

    const updateUserProfile = useCallback(
        async (data: UpdateProfileRequest) => {
            try {
                const updatedUser = await updateProfile(data).unwrap();
                const auth: AuthState | null = authLocalStorage.getAuthState();

                if (auth) {
                    dispatch(authSlice.actions.userUpdatedProfile(updatedUser));
                    authLocalStorage.saveAuthState({ ...auth, user: updatedUser });
                    notificationService.showSuccessMessage('Profile updated');
                } 
            } catch (error) {
                handleApiError(error as FetchBaseQueryError);
            }
        },
        [updateProfile, dispatch],
    );

    return { updateUserProfile };
};