import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useForgotPasswordMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { isObject } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ForgotPasswordForm, FormData } from '../components/ForgotPasswordForm';

export const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  const onSubmit = async (formData: FormData) => {
    try {
      await forgotPassword(formData).unwrap();
      notificationService.showSuccessMessage(
        'If the email you entered is in our system, you will receive a password reset email.',
      );
      navigate('/auth/login');
    } catch (error) {
      notificationService.showErrorMessage('Unable to perform forgot password request.');
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
      <Title>Forgot Password</Title>
      <p className='text-muted'>
        Enter the email associated with your account and we'll send you instruction on how to reset your password.
      </p>
      <ForgotPasswordForm onSubmit={onSubmit} serverValidationErrors={formValidationErrors} />

      <div className='mt-2 mb-2'>
        <small>
          Remember your password? <Link to='/auth/login'>Go back to login</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
