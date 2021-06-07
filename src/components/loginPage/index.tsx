/* eslint-disable jsx-quotes */
import { FC } from 'react';
import { LogInForm } from 'components/logInForm';
import { Link, useHistory } from 'react-router-dom';
import { ILogInFormData } from '../logInForm/types';
import { Wrapper, FormLeft, FormRight, CreateAccountButton } from './styled';

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
      <FormLeft>
        <LogInForm onSubmit={onSubmit} onCancel={onCancel} />
        <Link to='/auth/forgot-password'>Forgot Password?</Link>
      </FormLeft>
      <FormRight>
        <h2>Not Registered Yet?</h2>
        <p>Registering for your account is quick and easy</p>
        <CreateAccountButton onClick={navigateToSignup}> CREATE ACCOUNT</CreateAccountButton>
      </FormRight>
    </Wrapper>
  );
};
