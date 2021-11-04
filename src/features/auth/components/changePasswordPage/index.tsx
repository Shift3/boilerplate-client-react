import { ChangePasswordRequest, useChangePasswordMutation } from 'common/api/userApi';
import * as notificationService from 'common/services/notification';
import { useAuth } from 'features/auth/hooks';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ChangePasswordForm } from '../changePasswordForm';
import { IChangePasswordFormData } from '../changePasswordForm/types';

export const ChangePasswordPage: FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [changePassword] = useChangePasswordMutation();

  //  eslint-disable-next-line
  const onSubmit = async (formData: IChangePasswordFormData) => {
    const { currentPassword, newPassword, confirmPassword } = formData;
    const request: ChangePasswordRequest = { id: user!.id, oldPassword: currentPassword, newPassword, confirmPassword };

    try {
      await changePassword(request).unwrap();
      notificationService.showSuccessMessage('Password updated.');
    } catch (error) {
      notificationService.showErrorMessage(error.data.message);
    }

    history.push('/agents');
  };

  return (
    <PageWrapper>
      <StyledFormWrapper data-testid='wrapper'>
        <Title>Change Password</Title>
        <ChangePasswordForm onSubmit={onSubmit} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
