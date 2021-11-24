import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useSignUpMutation } from 'common/api/userApi';
import { handleApiError } from 'common/api/handleApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import * as notificationService from 'common/services/notification';
import { FormData, SignUpForm } from '../components/SignUpForm';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';

export const SignUpPage: FC = () => {
  const history = useHistory();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData };

    try {
      await signUp(data);
      notificationService.showSuccessMessage(`An activation email has been sent to ${data.email}.`);
      history.push('/auth/login');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <PageWrapper>
      <StyledFormWrapper>
        <Title>Sign Up</Title>
        <SignUpForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
