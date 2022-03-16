import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { isFetchBaseQueryError } from 'common/error/utilities';
import { useLogin } from 'features/auth/hooks';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormData, LogInForm } from '../components/LoginForm';

export const LogInPage: FC = () => {
  const { login } = useLogin();
  const [submissionError, setSubmissionError] = useState<FetchBaseQueryError | null>(null);

  const onSubmit = async (credentials: FormData) => {
    try {
      await login(credentials);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        setSubmissionError(error);
      }
    }
  };

  return (
    <FrontPageLayout>
      <Title>Member Log In</Title>
      <p className="text-muted">Welcome back to Bitwise Admin, the best admin panel on the internet.</p>
      <LogInForm onSubmit={onSubmit} submissionError={submissionError} />
      <div className='mt-2'>
        <small>
          Don't have an account? <Link to="/auth/signup">Register for one!</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
