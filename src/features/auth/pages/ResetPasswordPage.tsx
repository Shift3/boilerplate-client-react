import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { handleApiError } from 'common/api/handleApiError';
import * as notificationService from 'common/services/notification';
import { useResetPasswordMutation } from 'common/api/userApi';
import { FormData, ResetPasswordForm } from '../components/ResetPasswordForm';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { isErrorResponse, isFetchBaseQueryError } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';

export const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();
  const { token = '' } = useParams<{ token: string }>();
  const [resetPassword] = useResetPasswordMutation();
  const [submissionError, setSubmissionError] = useState<ServerValidationErrors<FormData> | null>(null);

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData, token };

    try {
      await resetPassword(data).unwrap();
      notificationService.showSuccessMessage('The password was reset successfully. Please log in.');
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

  return (
    <PageWrapper>
      <StyledFormWrapper>
        <Title>Reset Password</Title>
        <ResetPasswordForm onSubmit={onSubmit} serverValidationErrors={submissionError} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
