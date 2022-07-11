import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import * as notificationService from 'common/services/notification';
import { useResetPasswordMutation } from 'common/api/userApi';
import { FormData, ResetPasswordForm } from '../components/ResetPasswordForm';
import { PageWrapper } from 'common/styles/page';

export const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();
  const { token = '', uid = '' } = useParams<{ token: string; uid: string }>();
  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (formData: FormData) => {
    const data = { newPassword: formData.newPassword, token, uid };

    try {
      await resetPassword(data).unwrap();
      notificationService.showSuccessMessage('The password was reset successfully. Please log in.');
      navigate('/auth/login');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        handleApiError(error);
      } else {
        notificationService.showErrorMessage('Unable to reset password.');
        throw error;
      }
    }
  };

  return (
    <PageWrapper>
      <h1>Reset Password</h1>
      <ResetPasswordForm onSubmit={onSubmit} />
    </PageWrapper>
  );
};
