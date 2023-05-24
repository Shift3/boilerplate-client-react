import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useForgotPasswordMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { isObject } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ForgotPasswordForm, FormData } from '../components/ForgotPasswordForm';
import { useTranslation } from 'react-i18next';

export const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation(['translation', 'common']);
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  const onSubmit = async (formData: FormData) => {
    try {
      await forgotPassword(formData).unwrap();
      notificationService.showSuccessMessage(t('forgotPasswordPage.youWillReceiveEmail'));
      navigate('/auth/login');
    } catch (error) {
      notificationService.showErrorMessage(t('forgotPasswordPage.unableToResetPassword'));
      if (error && isFetchBaseQueryError(error)) {
        if (isObject(error.data)) {
          setFormValidationErrors(error.data);
        } else handleApiError(error);
      } else {
        throw error;
      }
    }
  };

  return (
    <FrontPageLayout>
      <Title>{t('forgotPasswordPage.forgotPassword')}</Title>
      <p className='text-muted'>{t('forgotPasswordPage.forgotPasswordDescription')}</p>
      <ForgotPasswordForm onSubmit={onSubmit} serverValidationErrors={formValidationErrors} />

      <div className='mt-2 mb-2'>
        <small>
          {t('forgotPasswordPage.rememberYourPassword')}{' '}
          <Link to='/auth/login'>{t('forgotPasswordPage.goBackToLogIn')}</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
