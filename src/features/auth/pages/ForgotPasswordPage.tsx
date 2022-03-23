import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { handleApiError } from 'common/api/handleApiError';
import { useForgotPasswordMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import * as notificationService from 'common/services/notification';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ForgotPasswordForm, FormData } from '../components/ForgotPasswordForm';

export const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = async (formData: FormData) => {
    try {
      const { message } = await forgotPassword(formData).unwrap();
      notificationService.showSuccessMessage(message);
      navigate('/auth/login');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  return (
    <FrontPageLayout>
      <Title>Forgot Password</Title>
      <p className='text-muted'>
        Enter the email associated with your account and we'll send you instruction on how to reset your password.
      </p>
      <ForgotPasswordForm onSubmit={onSubmit} />

      <div className='mt-2 mb-2'>
        <small>
          Remember your password? <Link to='/auth/login'>Go back to login</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
