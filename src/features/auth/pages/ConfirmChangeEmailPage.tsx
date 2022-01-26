import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useConfirmChangeEmailMutation } from 'common/api/userApi';
import * as notificationService from 'common/services/notification';
import { handleApiError } from 'common/api/handleApiError';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { ConfirmChangeEmailForm, FormData } from '../components/ConfirmChangeEmailForm';

export const ConfirmChangeEmailPage: FC = () => {
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const [confirmChangeEmail] = useConfirmChangeEmailMutation();

  const onSubmit = async (formData: FormData) => {
    try {
      const requestPayload = { ...formData, token };
      await confirmChangeEmail(requestPayload).unwrap();
      notificationService.showSuccessMessage('Email change successful.');
      history.push('/auth/login');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  return (
    <PageWrapper>
      <StyledFormWrapper data-testid='wrapper'>
        <Title>Verify Email Change</Title>
        <ConfirmChangeEmailForm onSubmit={onSubmit} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
