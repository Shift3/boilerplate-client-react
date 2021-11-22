import { useAuth } from 'features/auth/hooks';
import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormData, UpdateUserProfileForm } from '../../user-dashboard/components/UpdateUserProfileForm';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { useUpdateProfileMutation } from 'common/api/userApi';
import { handleApiError } from 'common/api/handleApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

type RouteParams = {
  id: string;
};

export const UpdateUserProfilePage: FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const { user } = useAuth();
  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (formData: FormData) => {
    const data = { id: Number(id), ...formData, profilePicture: '' };

    try {
      await updateProfile(data).unwrap();
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
