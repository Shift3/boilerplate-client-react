import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { useLogin } from 'features/auth/hooks';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FormData, LogInForm } from '../components/LoginForm';

export const LogInPage: FC = () => {
  const { login } = useLogin();

  const onSubmit = async (credentials: FormData) => {
    await login(credentials);
  };

  return (
    <FrontPageLayout>
      <Title>Member Log In</Title>
      <p className='text-muted'>Welcome back to Bitwise Admin, the best admin panel on the internet.</p>
      <LogInForm onSubmit={onSubmit} />
      <div className='mt-2'>
        <small>
          Don't have an account? <Link to='/auth/signup'>Register for one!</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
