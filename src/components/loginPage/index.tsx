/* eslint-disable jsx-quotes */
import { FC } from 'react';
import { LogInForm } from 'components/logInForm';
import { Link, useHistory } from 'react-router-dom';
import { ILogInFormData } from 'components/logInForm/types';
import { LoginWrapper, LeftLogin, RightLogin, CreateAccountButton, Title, Text, Wrapper, LinkWrapper } from './styled';

export const LogInPage: FC = () => {
  const history = useHistory();

  // TODO: we need to make an API call and handle
  // success and error cases.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (formData: ILogInFormData) => {
    history.push('/');
  };

  const onCancel = () => {
    history.push('/');
  };

  const { push } = useHistory();
  const navigateToSignup = () => push('/auth/signup');

  return (
    <Wrapper>
      <LoginWrapper>
        <LeftLogin>
          <LogInForm onSubmit={onSubmit} onCancel={onCancel} />
          <LinkWrapper>
            <Link to='/auth/change-password'>Forgot Password?</Link>
          </LinkWrapper>
        </LeftLogin>
        <RightLogin>
          <Title>
            <h2>Need to Register?</h2>
          </Title>
          <Text>
            <p>Registering for your account is quick and easy</p>
          </Text>
          <CreateAccountButton onClick={navigateToSignup}> CREATE ACCOUNT</CreateAccountButton>
        </RightLogin>
      </LoginWrapper>
    </Wrapper>
  );
};
