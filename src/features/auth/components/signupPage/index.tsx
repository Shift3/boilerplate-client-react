import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ISignUpFormData } from '../signupForm/types';
import { SignUpForm } from '../signupForm';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { useAccountCreation } from 'core/modules/user/application/useAccountCreation';

export const SignUpPage: FC = () => {
  const history = useHistory();
  const { createAccount } = useAccountCreation();

  const onSubmit = async (formData: ISignUpFormData) => {
    const data = { ...formData };
    const onSuccess = () => history.push('/auth/login');
    await createAccount(data, onSuccess);
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <PageWrapper data-testid='pageWrapper'>
      <StyledFormWrapper>
        <Title>Sign Up</Title>
        <SignUpForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
