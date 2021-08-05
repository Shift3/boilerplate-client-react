import { UpdateUserProfileFormData } from 'components/updateUserProfileForm/types';
import { useAuthState } from 'core/modules/auth/application/useAuthState';
import { useLogout } from 'core/modules/auth/application/useLogout';
import { useUpdateProfile } from 'core/modules/user/application/useUpdateProfile';
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
  const session = useAuthState();
  const { logoutUser } = useLogout();
  const { updateProfile } = useUpdateProfile();

  const onSubmit = async (formData: UpdateUserProfileFormData) => {
    const data = { ...formData, profilePicture: '' };

    const onSuccess = () => {
      if (session && session.user.email !== formData.email) {
        logoutUser();
        history.push('/auth/login');
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
          firstName: session!.user.firstName,
          lastName: session!.user.lastName,
          email: session!.user.email,
        }}
      />
    </Wrapper>
  );
};
