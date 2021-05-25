import { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { LoginForm } from "../loginForm";
import { Context as AuthContext } from '../../context/auth.context';
import {
  LoginFormContainer,
  LoginPageContainer,
  LoginFormContainerLeft,
  LoginFormContainerRight,
  customButtonStyles
} from './styled';

export const LoginPage: FC = () => {
  const { loginUser } = useContext(AuthContext);
  const history = useHistory();

  const navToSignup = () => history.push('/auth/signup');

  const renderLoginFormContainerLeft = () => (
    <LoginFormContainerLeft data-testid="lfc-l">
      <LoginForm onSubmit={ loginUser } />
      <br />
      <Link to="/auth/forgot-password">Forgot Password?</Link>
    </LoginFormContainerLeft>
  );

  const renderLoginFormContainerRight = () => (
    <LoginFormContainerRight data-testid="lfc-r">
      <h2 data-testid="lfc-r-h2">Not Registered Yet?</h2>
      <p data-testid="lfc-r-p">Registering for your account is quick and easy</p>
      <Button
        style={ customButtonStyles }
        onClick={ navToSignup }
        disabled={ false }
        type="button"
        data-testid="ca-btn"
      >
        CREATE ACCOUNT
      </Button>
    </LoginFormContainerRight>
  );

  return (
    <LoginPageContainer data-testid="lpc">
      <LoginFormContainer data-testid="lfc">
        { renderLoginFormContainerLeft() }
        { renderLoginFormContainerRight() }
      </LoginFormContainer>
    </LoginPageContainer>
  );
};