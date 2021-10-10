import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ForgotPasswordForm } from '../forgotPasswordForm';
import { IForgotPassswordFormData } from '../forgotPasswordForm/types';
import { Wrapper } from './styled';
import { usePasswordReset } from 'core/modules/user/application/usePasswordReset';

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
    <Wrapper data-testid='wrapper'>
      <ForgotPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};
