import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useSignUpMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { isObject } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormData, SignUpForm } from '../components/SignUpForm';
import { useTranslation } from 'react-i18next';

export const SignUpPage: FC = () => {
  const { t } = useTranslation(['translation', 'common']);
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData };

    try {
      await signUp(data);
      notificationService.showSuccessMessage(`${t('signUpPage.activationEmailSentTo')  } ${data.email}.`);
      navigate('/auth/login');
    } catch (error) {
      notificationService.showErrorMessage(t('signUpPage.unableToCreateAccount'));
      if (error && isFetchBaseQueryError(error)) {
        if (isObject(error.data)) {
          setFormValidationErrors(error.data);
        } else handleApiError(error);
      } else {
        throw error;
      }
    }
  };

  const onCancel = () => navigate('/auth/login');

  return (
    <FrontPageLayout>
      <Title>{t('signUpPage.memberRegistration')}</Title>
      <p className='text-muted'>{t('signUpPage.memberRegistrationDescription')}</p>
      <SignUpForm onSubmit={onSubmit} onCancel={onCancel} serverValidationErrors={formValidationErrors} />
      <div className='mt-2 mb-2'>
        <small>
          {t('signUpPage.alreadyHaveAnAccount')} <Link to='/auth/login'>{t('logIn', { ns: 'common' })}</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
