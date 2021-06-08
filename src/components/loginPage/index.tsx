import { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CustomButton } from '../button/styled';
import { LoginForm } from "../loginForm";
import { Context as AuthContext } from '../../context/auth.context';
import {
  LoginFormContainer,
  LoginPageContainer,
  LoginFormContainerLeft,
  LoginFormContainerRight
} from './styled';

export const LoginPage: FC = () => {
  const { loginUser } = useContext(AuthContext);
  const { push } = useHistory();
  const navigateToSignup = () => push('/auth/signup');

  return (
    <LoginPageContainer data-testid="loginPageContainer">
      <LoginFormContainer data-testid="loginFormContainer">
        <LoginFormContainerLeft data-testid="loginFormContainerLeft">
          <LoginForm onSubmit={ loginUser } />
          <br />
          <Link to="/auth/forgot-password">Forgot Password?</Link>
        </LoginFormContainerLeft>
        <LoginFormContainerRight data-testid="loginFormContainerRight">
          <h2 data-testid="loginPageInfoHeading">Not Registered Yet?</h2>
          <p data-testid="loginPageInfoContent">Registering for your account is quick and easy</p>
          <CustomButton data-testid="createAccountButton" onClick={ navigateToSignup }>
            CREATE ACCOUNT
          </CustomButton>
        </LoginFormContainerRight>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};