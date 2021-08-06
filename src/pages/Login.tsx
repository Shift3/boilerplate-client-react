import { LogInForm } from 'components/loginForm';
import { useLogin } from 'core/modules/auth/application/useLogin';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ILogInFormData } from '../components/loginForm/types';
import { PageWrapper } from '../styles/pages/PageWrapper.js';

const LoginWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: ${(props) => props.theme.primary};
  border-radius: 5px;
`;

const LeftLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LinkWrapper = styled.div`
  padding-bottom: 30px;
  font-size: 1.2em;
`;

const RightLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px;
  max-width: 350px;
  min-height: 400px;
`;

const Title = styled.div`
  color: ${(props) => props.theme.cardHeader};
  font-style: bold;
  padding-bottom: 10px;
  width: 200px;
`;

const Text = styled.div`
  color: white;
`;

const CreateAccountButton = styled(Button)``;

export const LoginPage: FC = () => {
  const history = useHistory();
  const { loginUser } = useLogin();

  const onSubmit = (formData: ILogInFormData) => {
    const credentials = { ...formData };
    const onSuccess = () => history.push('/');
    loginUser(credentials, onSuccess);
  };

  const onCancel = () => history.push('/auth/login');

  const { push } = useHistory();
  const navigateToSignup = () => push('/auth/signup');

  return (
    <PageWrapper>
      <LoginWrapper data-testid='loginWrapper'>
        <LeftLogin data-testid='leftLogin'>
          <LogInForm onSubmit={onSubmit} onCancel={onCancel} />
          <LinkWrapper>
            <Link to='/auth/forgot-password'>Forgot Password?</Link>
          </LinkWrapper>
        </LeftLogin>
        <RightLogin data-testid='rightLogin'>
          <Title>
            <h2 data-testid='loginPageInfoHeading'>Not Registered Yet?</h2>
          </Title>
          <Text>
            <p data-testid='loginPageInfoContent'>Registering for your account is quick and easy.</p>
          </Text>
          <CreateAccountButton data-testid='createAccountButton' onClick={navigateToSignup}>
            CREATE ACCOUNT
          </CreateAccountButton>
        </RightLogin>
      </LoginWrapper>
    </PageWrapper>
  );
};
