import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context as AuthContext } from '../../context/auth.context';
import { LoginFormContainer } from './styled';
import { FormBuilder } from '../formBuilder';
import LoginFormConfig from '../formBuilder/configs/login.formConfig';
import { generateLoginFormSchema } from '../formBuilder/schema/loginForm.schema';

export const LoginPage: FC = () => {
  const { loginUser } = useContext(AuthContext);

  const onSubmit = (data: Record<string, unknown>) => {
    // eslint-disable-next-line no-console
    console.log('Data: ', data);
    loginUser(data);
  };

  return (
    <LoginFormContainer>
      <FormBuilder
        config={LoginFormConfig}
        schemaGenerator={generateLoginFormSchema}
        onSubmit={onSubmit}
        title="Login"
      />
      <Link to="/auth/forgot-password">Forgot Password?</Link>
    </LoginFormContainer>
  );
};
