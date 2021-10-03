import { LogInForm } from 'components/loginForm';
import { useLogin } from 'features/auth/hooks';
import { FC } from 'react';
import styled from 'styled-components';
import { ILogInFormData } from '../loginForm/types';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${(props) => props.theme.authBackground};
`;

// const RightLogin = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   padding: 50px;
//   max-width: 350px;
//   min-height: 400px;
// `;

// const LoginWrapper = styled.div`
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   background-color: ${(props) => props.theme.primary};
//   border-radius: 5px;
// `;

export const LogInPage: FC = () => {
  const history = useHistory();
  const { login } = useLogin();

  const onSubmit = async (credentials: ILogInFormData) => {
    login(credentials);
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <Wrapper data-testid='wrapper'>
      <LogInForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};
