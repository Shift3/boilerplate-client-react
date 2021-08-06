import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ISignUpFormData } from 'components/signupForm/types';
import { SignUpForm } from 'components/signupForm';
import { useAccountCreation } from 'core/modules/user/application/useAccountCreation';
import { PageWrapper } from '../styles/pages/PageWrapper.js';

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
    <PageWrapper>
      <SignUpForm onSubmit={onSubmit} onCancel={onCancel} />
    </PageWrapper>
  );
};
