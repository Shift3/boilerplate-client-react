import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory, useParams } from 'react-router-dom';
import { ResetPasswordForm } from '../resetPasswordForm';
import { IResetPasswordFormData } from '../resetPasswordForm/types';
import { StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { usePasswordReset } from 'core/modules/user/application/usePasswordReset';

export const ResetPasswordPage: FC = () => {
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const { resetPassword } = usePasswordReset();

  const onSubmit = async (formData: IResetPasswordFormData) => {
    const data = { ...formData, token };
    const onSuccess = () => history.push('/');
    await resetPassword(data, onSuccess);
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper data-testid='wrapper'>
        <Title>Reset Password</Title>
        <ResetPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </Container>
  );
};
