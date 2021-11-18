import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { FormData, PasswordResetForm } from 'features/auth/components/PasswordResetForm';
import { useActivateAccountMutation } from 'common/api/userApi';
import { handleApiError } from 'common/api/handleApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import * as notificationService from 'common/services/notification';

export const ActivateAccountPage: FC = () => {
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const [activateAccount] = useActivateAccountMutation();

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData, token };

    try {
      await activateAccount(data).unwrap();
      notificationService.showSuccessMessage('This account has been activated. Please log in.');
      history.push('/auth/login');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <PageWrapper>
      <StyledFormWrapper data-testid='wrapper'>
        <Title>Activate Account</Title>
        <PasswordResetForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
