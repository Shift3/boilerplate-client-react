import { FC } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useAuth } from 'features/auth/hooks';
import { useUpdateProfileMutation } from 'common/api/userApi';
import { handleApiError } from 'common/api/handleApiError';
import { useAppDispatch } from 'app/redux';
import { authSlice } from 'features/auth/authSlice';
import * as notificationService from 'common/services/notification';
import * as authLocalStorage from 'features/auth/authLocalStorage';
import { FormData, UpdateUserProfileForm } from '../components/UpdateUserProfileForm';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { Breadcrumb } from 'react-bootstrap';

type RouteParams = {
  id: string;
};

export const UpdateUserProfilePage: FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const { token, user } = useAuth();
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: FormData) => {
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

  return (
    <PageWrapper>
      <Title>Update Profile</Title>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}} >
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Update Profile
        </Breadcrumb.Item>
      </Breadcrumb>

      <StyledFormWrapper>
        <UpdateUserProfileForm
          onSubmit={onSubmit}
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
