import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { handleApiError } from 'common/api/handleApiError';
import { useConfirmChangeEmailMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { isErrorResponse, isFetchBaseQueryError } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmChangeEmailForm, FormData } from '../components/ConfirmChangeEmailForm';

export const ConfirmChangeEmailPage: FC = () => {
  const navigate = useNavigate();
  const { token = '' } = useParams<{ token: string }>();
  const [confirmChangeEmail] = useConfirmChangeEmailMutation();
  const [submissionError, setSubmissionError] = useState<ServerValidationErrors<FormData> | null>(null);

  const onSubmit = async (formData: FormData) => {
    try {
      const requestPayload = { ...formData, token };
      await confirmChangeEmail(requestPayload).unwrap();
      notificationService.showSuccessMessage('Email change successful.');
      navigate('/auth/login');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (isErrorResponse<FormData>(error?.data)) {
          setSubmissionError(error?.data?.error);
        }
      }
      handleApiError(error as FetchBaseQueryError);
    }
  };

  return (
    <FrontPageLayout>
      <Title>Verify Email Change</Title>
      <p className='text-muted'>
        You have requested an email change. Enter the verification code you received in your email.
      </p>
      <ConfirmChangeEmailForm onSubmit={onSubmit} serverValidationErrors={submissionError} />
    </FrontPageLayout>
  );
};
