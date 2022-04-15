import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { handleApiError } from 'common/api/handleApiError';
import { useSignUpMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { isErrorResponse, isFetchBaseQueryError } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormData, SignUpForm } from '../components/SignUpForm';

export const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [submissionError, setSubmissionError] = useState<ServerValidationErrors<FormData> | null>(null);

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData };

    try {
      await signUp(data);
      notificationService.showSuccessMessage(`An activation email has been sent to ${data.email}.`);
      navigate('/auth/login');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (isErrorResponse<FormData>(error?.data)) {
          setSubmissionError((error?.data).error);
        }
      }
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onCancel = () => navigate('/auth/login');

  return (
    <FrontPageLayout>
      <Title>Member Registration</Title>
      <p className='text-muted'>Register for the Bitwise Admin Panel to join the best admin panel on the internet.</p>
      <SignUpForm onSubmit={onSubmit} onCancel={onCancel} serverValidationErrors={submissionError} />
      <div className='mt-2 mb-2'>
        <small>
          Already have an account? <Link to='/auth/login'>Log In</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
