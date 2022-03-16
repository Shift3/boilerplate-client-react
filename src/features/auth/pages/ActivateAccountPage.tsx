import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { handleApiError } from 'common/api/handleApiError';
import { useActivateAccountMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { isFetchBaseQueryError } from 'common/error/utilities';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { FC, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ActivateAccountForm, FormData } from '../components/ActivateAccountForm';

export const ActivateAccountPage: FC = () => {
  const navigate = useNavigate();
  const { token = '' } = useParams<{ token: string }>();
  const [activateAccount] = useActivateAccountMutation();
  const [submissionError, setSubmissionError] = useState<FetchBaseQueryError | null>(null);

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData, token };

    try {
      await activateAccount(data);
      notificationService.showSuccessMessage('This account has been activated. Please log in.');
      navigate('/auth/login');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        setSubmissionError(error);
      }
      handleApiError(error as FetchBaseQueryError);
    }
  };

  return (
    <FrontPageLayout>
      <Title>Activate Account</Title>
      <p className='text-muted'>Just one more step! Choose a password to active your account.</p>
      <StyledFormWrapper data-testid='wrapper'>
        <ActivateAccountForm onSubmit={onSubmit} submissionError={submissionError} />
        <div className='mt-2 mb-2'>
          <small>
            Ended up here by mistake? <Link to='/auth/login'>Log In</Link>
          </small>
        </div>
      </StyledFormWrapper>
    </FrontPageLayout>
  );
};
