import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../login/LoginForm';
import { Context as AuthContext } from '../../context/auth.context';
import { LoginFormContainer } from './styled';

export const LoginPage: FC = () => {
  const { loginUser } = useContext(AuthContext);

  return (
    <LoginFormContainer>
      <LoginForm onSubmit={loginUser} />
      <Link to="/auth/forgot-password">Forgot Password?</Link>
    </LoginFormContainer>
  );
};
