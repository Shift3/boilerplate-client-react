/* eslint-disable jsx-quotes */
import { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CustomButton } from 'components/button';
import { LoginForm } from '../loginForm';
import { Context as AuthContext } from '../../context/auth.context';
import { LoginFormContainer, LoginPageContainer, LoginFormLeft, LoginFormRight } from './styled';

export const LoginPage: FC = () => {
  const { loginUser } = useContext(AuthContext);
  const { push } = useHistory();
  const navigateToSignup = () => push('/auth/signup');

  return (
    <LoginPageContainer data-testid='lpc'>
      <LoginFormContainer data-testid='lfc'>
        <LoginFormLeft data-testid='lfc-l'>
          <LoginForm onSubmit={loginUser} />
          <br />
          <Link to='/auth/forgot-password'>Forgot Password?</Link>
        </LoginFormLeft>
        <LoginFormRight data-testid='lfc-r'>
          <h2 data-testid='lfc-r-h2'>Not Registered Yet?</h2>
          <p data-testid='lfc-r-p'>Registering for your account is quick and easy</p>
          <CustomButton onClick={navigateToSignup} data-testid='ca-btn'>
            CREATE ACCOUNT
          </CustomButton>
        </LoginFormRight>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};
