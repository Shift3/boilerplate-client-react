import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpFormData } from 'components/signupForm/types';
import { SignUpForm } from 'components/signupForm/SignupForm';
import { useAccountCreation } from 'core/modules/user/application/useAccountCreation';
import { PageWrapper } from 'styles/pages/PageWrapper';

export const SignUpPage: FC = () => {
  const history = useHistory();
  const { createAccount } = useAccountCreation();

  const onSubmit = async (formData: SignUpFormData) => {
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
