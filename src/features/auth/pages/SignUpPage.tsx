import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useSignUpMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { isObject } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormData, SignUpForm } from '../components/SignUpForm';

export const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData };

    try {
      await signUp(data);
      notificationService.showSuccessMessage(`An activation email has been sent to ${data.email}.`);
      navigate('/auth/login');
    } catch (error) {
      notificationService.showErrorMessage('Unable to create account.');
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
      <Title>Member Registration</Title>
      <p className='text-muted'>Register for the Bitwise Admin Panel to join the best admin panel on the internet.</p>
      <SignUpForm onSubmit={onSubmit} onCancel={onCancel} serverValidationErrors={formValidationErrors} />
      <div className='mt-2 mb-2'>
        <small>
          Already have an account? <Link to='/auth/login'>Log In</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
