import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ResetPasswordForm } from '../resetPasswordForm';
import { IResetPasswordFormData } from '../resetPasswordForm/types';
import { Wrapper } from './styled';
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
    <Wrapper data-testid='wrapper'>
      <ResetPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};
