import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ForgotPasswordForm } from '../forgotPasswordForm';
import { IForgotPassswordFormData } from 'components/forgotPasswordForm/types';
import { Wrapper } from './styled';
import { usePasswordReset } from 'core/modules/user/application/passwordReset';

export const ForgotPasswordPage: FC = () => {
  const history = useHistory();
  const { sendForgotPasswordEmail } = usePasswordReset();

  const onSubmit = (formData: IForgotPassswordFormData) => {
    const data = { ...formData };
    const onSuccess = () => history.push('/');
    sendForgotPasswordEmail(data, onSuccess);
  };

  const onCancel = () => history.push('/');

  return (
    <Wrapper data-testid='wrapper'>
      <ForgotPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};
