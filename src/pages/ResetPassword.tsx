import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ResetPasswordForm } from '../components/resetPasswordForm';
import { IResetPasswordFormData } from '../components/resetPasswordForm/types';
import { usePasswordReset } from 'core/modules/user/application/usePasswordReset';
import { PageWrapper } from 'styles/pages/PageWrapper';

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
    <PageWrapper>
      <ResetPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
    </PageWrapper>
  );
};
