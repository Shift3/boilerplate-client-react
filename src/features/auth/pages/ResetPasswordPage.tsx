import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PageWrapper, StyledFormWrapper, Title } from 'common/styles/PageStyles';
import { FormData, PasswordResetForm } from '../components/PasswordResetForm';
import { useResetPasswordMutation } from 'common/api/userApi';
import * as notificationService from 'common/services/notification';
import { handleApiError } from 'common/api/handleApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const ResetPasswordPage: FC = () => {
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData, token };

    try {
      await resetPassword(data).unwrap();
      notificationService.showSuccessMessage('The password was reset successfully. Please log in.');
      history.push('/auth/login');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <PageWrapper>
      <StyledFormWrapper>
        <Title>Reset Password</Title>
        <PasswordResetForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
