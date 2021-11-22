import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { FormData, SignUpForm } from '../components/SignUpForm';
import { PageWrapper, StyledFormWrapper, Title } from 'common/styles/PageStyles';
import { useSignUpMutation } from 'common/api/userApi';
import { showSuccessMessage } from 'common/services/notification';
import { handleApiError } from 'common/api/handleApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const SignUpPage: FC = () => {
  const history = useHistory();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data).unwrap();
      showSuccessMessage(`An activation email has been sent to ${data.email}.`);
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
