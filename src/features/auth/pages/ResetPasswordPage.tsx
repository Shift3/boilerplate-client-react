import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ResetPasswordForm } from '../resetPasswordForm';
import { IResetPasswordFormData } from '../resetPasswordForm/types';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { handleApiError } from 'common/api/handleApiError';
import * as notificationService from 'common/services/notification';
import { useResetPasswordMutation } from 'common/api/userApi';

export const ResetPasswordPage: FC = () => {
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (formData: IResetPasswordFormData) => {
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
        <ResetPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
