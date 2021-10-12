import { UpdateUserProfileFormData } from '../updateUserProfileForm/types';
import { useUpdateProfile } from 'core/modules/user/application/useUpdateProfile';
import { useAuth, useLogout } from 'features/auth/hooks';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UpdateUserProfileForm } from '../updateUserProfileForm/index';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.adminBackground};
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UpdateUserProfilePage: FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { logout } = useLogout();
  const { updateProfile } = useUpdateProfile();

  const onSubmit = async (formData: UpdateUserProfileFormData) => {
    const data = { ...formData, profilePicture: '' };

    const onSuccess = () => {
      if (user && user.email !== formData.email) {
        logout();
      } else {
        history.goBack();
      }
    };

    updateProfile(data, onSuccess);
  };

  const onCancel = () => history.goBack();

  return (
    <Wrapper>
      <UpdateUserProfileForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        defaultValues={{
          firstName: user?.firstName ?? '',
          lastName: user?.lastName ?? '',
          email: user?.email ?? '',
        }}
      />
    </Wrapper>
  );
};
