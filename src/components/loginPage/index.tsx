import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CustomButton } from '../button';
import { LoginForm } from "../loginForm";
import { LoginFormContainer, LoginPageContainer, LoginFormLeft, LoginFormRight } from './styled';
import colors from '../../utils/styleValues';

export const LoginPage: FC = () => {
  const history = useHistory();

  const onCreateAccountClick = () => {
    history.push('/auth/signup');
  };

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginFormLeft>
          <LoginForm/>
          <br />
          <Link to="/auth/forgot-password">Forgot Password?</Link>
        </LoginFormLeft>
        <LoginFormRight>
          <h2>Not Registered Yet?</h2>
          <p>Registering for your account is quick and easy</p>
          <CustomButton
            backgroundColor={colors.accent}
            color="#fff"
            onClick={onCreateAccountClick}
            disabled={false}
            type="button"
            text="CREATE ACCOUNT"
            width="90%"
          />
        </LoginFormRight>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};
