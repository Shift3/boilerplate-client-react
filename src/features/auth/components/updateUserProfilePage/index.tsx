import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { UpdateUserProfileFormData } from '../updateUserProfileForm/types';
import { useAuth } from 'features/auth/hooks';
import { UpdateUserProfileForm } from '../updateUserProfileForm/index';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { useUpdateProfileMutation } from 'common/api/userApi';
import { handleApiError } from 'common/api/handleApiError';
import { useAppDispatch } from 'app/redux';
import { authSlice } from 'features/auth/authSlice';
import * as notificationService from 'common/services/notification';
import * as authLocalStorage from 'features/auth/authLocalStorage';

type RouteParams = {
  id: string;
};

export const UpdateUserProfilePage: FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const { token, user } = useAuth();
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: UpdateUserProfileFormData) => {
    const data = { id: Number(id), ...formData, profilePicture: '' };

    try {
      const updatedUser = await updateProfile(data).unwrap();
      const newAuth = { token, user: updatedUser };
      dispatch(authSlice.actions.userLoggedIn(newAuth));
      authLocalStorage.saveAuthState(newAuth);
      notificationService.showSuccessMessage('Profile updated.');
      history.push('/agents');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onCancel = () => history.goBack();

  return (
    <PageWrapper>
      <StyledFormWrapper>
        <Title>Update Profile</Title>
        <UpdateUserProfileForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          defaultValues={{
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
            email: user?.email ?? '',
          }}
        />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
