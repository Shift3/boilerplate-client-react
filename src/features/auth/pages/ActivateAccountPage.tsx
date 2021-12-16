import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { handleApiError } from 'common/api/handleApiError';
import { useActivateAccountMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ActivateAccountForm, FormData } from '../components/ActivateAccountForm';

export const ActivateAccountPage: FC = () => {
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const [activateAccount] = useActivateAccountMutation();

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData, token };

    try {
      await activateAccount(data);
      notificationService.showSuccessMessage('This account has been activated. Please log in.');
      history.push('/auth/login');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  return (
    <FrontPageLayout>
      <Title>Activate Account</Title>
      <p className="text-muted">Just one more step! Choose a password to active your account.</p>
      <StyledFormWrapper data-testid='wrapper'>
        <ActivateAccountForm onSubmit={onSubmit} />
      </StyledFormWrapper>
    </FrontPageLayout>
  );
};
