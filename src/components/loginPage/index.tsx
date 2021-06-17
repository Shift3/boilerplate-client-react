import { FC } from 'react';
import { LogInForm } from 'components/loginForm';
import { Link, useHistory } from 'react-router-dom';
import { ILogInFormData } from '../loginForm/types';
import { LoginWrapper, LeftLogin, RightLogin, CreateAccountButton, Title, Text, Wrapper, LinkWrapper } from './styled';

export const LogInPage: FC = () => {
  const history = useHistory();

  // TODO: we need to make an API call and handle
  // success and error cases.

  // eslint-disable-next-line
  const onSubmit = (formData: ILogInFormData) => {
    history.push('/');
  };

  const onCancel = () => {
    history.goBack();
  };

  const { push } = useHistory();
  const navigateToSignup = () => push('/auth/signup');

  return (
    <Wrapper data-testid="wrapper">
      <LoginWrapper data-testid="loginWrapper">
        <LeftLogin data-testid="leftLogin">
          <LogInForm onSubmit={onSubmit} onCancel={onCancel} />
          <LinkWrapper>
            <Link to="/auth/change-password">Forgot Password?</Link>
          </LinkWrapper>
        </LeftLogin>
        <RightLogin data-testid="rightLogin">
          <Title>
            <h2 data-testid="loginPageInfoHeading">Not Registered Yet?</h2>
          </Title>
          <Text>
            <p data-testid="loginPageInfoContent">Registering for your account is quick and easy.</p>
          </Text>
          <CreateAccountButton data-testid="createAccountButton" onClick={navigateToSignup}>
            CREATE ACCOUNT
          </CreateAccountButton>
        </RightLogin>
      </LoginWrapper>
    </Wrapper>
  );
};
