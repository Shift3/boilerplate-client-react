import { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CustomButton } from '../button';
import { Context as AuthContext } from '../../context/auth.context';
import { LoginFormContainer, LoginPageContainer, LoginFormLeft, LoginFormRight } from './styled';
import { FormBuilder } from '../formBuilder';
import LoginFormConfig from '../formBuilder/configs/login.formConfig';
import { generateLoginFormSchema } from '../formBuilder/schema/loginForm.schema';
import colors from '../../utils/styleValues';

export const LoginPage: FC = () => {
  const { loginUser } = useContext(AuthContext);

  const onSubmit = (data: Record<string, unknown>) => {
    // eslint-disable-next-line no-console
    console.log('Data: ', data);
    loginUser(data);
  };

  const history = useHistory();

  const onCreateAccountClick = () => {
    history.push('/auth/signup');
  };

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginFormLeft>
          <FormBuilder
            config={LoginFormConfig}
            schemaGenerator={generateLoginFormSchema}
            onSubmit={onSubmit}
            title="Member Log In"
            buttonText="LOG IN"
          />
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
