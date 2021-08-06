import { UpdateUserProfileFormData } from 'components/updateUserProfileForm/types';
import { useAuthState } from 'core/modules/auth/application/useAuthState';
import { useLogout } from 'core/modules/auth/application/useLogout';
import { useUpdateProfile } from 'core/modules/user/application/useUpdateProfile';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { PageWrapper } from 'styles/pages/PageWrapper';
import { UpdateUserProfileForm } from '../components/updateUserProfileForm/index';

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
    <PageWrapper>
      <UpdateUserProfileForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        defaultValues={{
          firstName: session!.user.firstName,
          lastName: session!.user.lastName,
          email: session!.user.email,
        }}
      />
    </PageWrapper>
  );
};
