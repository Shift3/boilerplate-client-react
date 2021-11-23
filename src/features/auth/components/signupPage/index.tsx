import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ISignUpFormData } from '../signupForm/types';
import { SignUpForm } from '../signupForm';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { useSignUpMutation } from 'common/api/userApi';
import { handleApiError } from 'common/api/handleApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import * as notificationService from 'common/services/notification';

export const SignUpPage: FC = () => {
  const history = useHistory();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (formData: ISignUpFormData) => {
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
