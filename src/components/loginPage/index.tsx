/* eslint-disable jsx-quotes */
import { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CustomButton } from '../button';
import { LoginForm } from '../logInForm';
import { LoginFormContainer, LoginPageContainer, LoginFormLeft, LoginFormRight } from './styled';
import colors from '../../utils/styleValues';
import { Context as AuthContext } from '../../context/auth.context';

export const LoginPage: FC = () => {
  const { loginUser } = useContext(AuthContext);

  const history = useHistory();

  const onCreateAccountClick = () => {
    history.push('/auth/signup');
  };

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginFormLeft>
          <LoginForm onSubmit={loginUser} />
          <br />
          <Link to='/auth/forgot-password'>Forgot Password?</Link>
        </LoginFormLeft>
        <LoginFormRight>
          <h2>Not Registered Yet?</h2>
          <p>Registering for your account is quick and easy</p>
          <CustomButton
            backgroundColor={colors.accent}
            color='#fff'
            onClick={onCreateAccountClick}
            disabled={false}
            type='button'
            width='90%'
          >
            CREATE ACCOUNT
          </CustomButton>
        </LoginFormRight>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};
