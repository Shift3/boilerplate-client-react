import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useForgotPasswordMutation } from 'common/api/userApi';
import * as notificationService from 'common/services/notification';
import { handleApiError } from 'common/api/handleApiError';
import { ForgotPasswordForm, FormData } from '../components/ForgotPasswordForm';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';

export const ForgotPasswordPage: FC = () => {
  const history = useHistory();
  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = async (formData: FormData) => {
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
