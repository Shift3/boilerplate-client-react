import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ForgotPasswordForm } from '../components/forgotPassword/ForgotPasswordForm';
import { IForgotPassswordFormData } from 'components/forgotPassword/types';
import { usePasswordReset } from 'core/modules/user/application/usePasswordReset';
import { PageWrapper } from '../styles/pages/PageWrapper.js';

export const ForgotPasswordPage: FC = () => {
  const history = useHistory();
  const { sendResetPasswordEmail } = usePasswordReset();

  const onSubmit = (formData: IForgotPassswordFormData) => {
    const { email } = formData;
    const onSuccess = () => history.push('/');
    sendResetPasswordEmail(email, onSuccess);
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <PageWrapper>
      <ForgotPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
    </PageWrapper>
  );
};
