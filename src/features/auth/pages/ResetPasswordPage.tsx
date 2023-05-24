import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import * as notificationService from 'common/services/notification';
import { useResetPasswordMutation } from 'common/api/userApi';
import { FormData, ResetPasswordForm } from '../components/ResetPasswordForm';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { useTranslation } from 'react-i18next';

export const ResetPasswordPage: FC = () => {
  const { t } = useTranslation(['translation', 'common']);
  const navigate = useNavigate();
  const { token = '', uid = '' } = useParams<{ token: string; uid: string }>();
  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (formData: FormData) => {
    const data = { newPassword: formData.newPassword, token, uid };

    try {
      await resetPassword(data).unwrap();
      notificationService.showSuccessMessage(t('resetPasswordPage.passwordResetSuccessful'));
      navigate('/auth/login');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        handleApiError(error);
      } else {
        notificationService.showErrorMessage(t('resetPasswordPage.unableToResetPassword'));
        throw error;
      }
    }
  };

  return (
    <FrontPageLayout>
      <Title>{t('resetPasswordPage.resetPassword')}</Title>
      <p className='text-muted'>{t('resetPasswordPage.resetPasswordDescription')}</p>
      <ResetPasswordForm onSubmit={onSubmit} />
    </FrontPageLayout>
  );
};
