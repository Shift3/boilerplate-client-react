import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { IResetPasswordFormData } from '../resetPasswordForm/types';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { ActivateAccountForm } from 'features/auth/components/activateAccountForm';
import { useActivateAccountMutation } from 'common/api/userApi';
import { handleApiError } from 'common/api/handleApiError';
import * as notificationService from 'common/services/notification';

export const ActivateAccountPage: FC = () => {
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const [activateAccount] = useActivateAccountMutation();

  const onSubmit = async (formData: IResetPasswordFormData) => {
    const data = { ...formData, token };

    try {
      await activateAccount(data);
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
        <ActivateAccountForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
