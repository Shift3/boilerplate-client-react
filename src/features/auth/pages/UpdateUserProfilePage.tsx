import { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
import { BreadcrumbComponent } from 'common/components/Breadcrumb'

type RouteParams = {
  id: string;
};

export const UpdateUserProfilePage: FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const { token, user } = useAuth();
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Update User Profile";
  });

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
    <>
    <BreadcrumbComponent path={['Home', 'Update Profile']} />
    <PageWrapper>
      <StyledFormWrapper>
        <Title>Update Profile</Title>
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
    </>
  );
};
