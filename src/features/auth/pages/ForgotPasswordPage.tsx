import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ForgotPasswordForm } from '../forgotPasswordForm';
import { IForgotPassswordFormData } from '../forgotPasswordForm/types';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { useForgotPasswordMutation } from 'common/api/userApi';
import * as notificationService from 'common/services/notification';
import { handleApiError } from 'common/api/handleApiError';

export const ForgotPasswordPage: FC = () => {
  const history = useHistory();
  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = async (formData: IForgotPassswordFormData) => {
    try {
      const { message } = await forgotPassword(formData).unwrap();
      notificationService.showSuccessMessage(message);
      history.push('/auth/login');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <PageWrapper>
      <StyledFormWrapper data-testid='wrapper'>
        <Title>Forgot Password</Title>
        <ForgotPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
