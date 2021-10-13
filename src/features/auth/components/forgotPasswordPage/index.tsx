import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ForgotPasswordForm } from '../forgotPasswordForm';
import { IForgotPassswordFormData } from '../forgotPasswordForm/types';
import Container from 'react-bootstrap/Container';
import { StyledFormWrapper } from 'features/styles/PageStyles';
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
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper data-testid='wrapper'>
        <ForgotPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </Container>
  );
};
