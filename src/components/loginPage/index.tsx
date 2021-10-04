import { LogInForm } from 'components/loginForm';
import { useLogin } from 'features/auth/hooks';
import { FC } from 'react';
import styled from 'styled-components';
import { ILogInFormData } from '../loginForm/types';
import { ForgotPasswordLink } from './forgotPassword';
import { RegisterCallToAction } from './registerCallToAction';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${(props) => props.theme.authBackground};
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding: 40px;
  background-color: ${(props) => props.theme.forms.backgroundColor};
  border: 2px solid red;
`;

//
// const LoginWrapper = styled.div`;
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   background-color: ${(props) => props.theme.primary};
//   border-radius: 5px;
// `;

const LeftColumn = styled.div`
  width: 60%;
`;

const RightColumn = styled.div`
  width: 30%;
`;

const Title = styled.div`
  color: ${(props) => props.theme.forms.title};
  font-size: 2em;
  font-style: bold;
`;

export const LogInPage: FC = () => {
  const history = useHistory();
  const { login } = useLogin();

  const onSubmit = async (credentials: ILogInFormData) => {
    login(credentials);
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <Wrapper data-testid='wrapper'>
      <StyledContainer>
        <LeftColumn>
          <Title>Member Log In</Title>
          <LogInForm onSubmit={onSubmit} onCancel={onCancel} />
          <ForgotPasswordLink />
        </LeftColumn>
        <RightColumn>
          <RegisterCallToAction />
        </RightColumn>
      </StyledContainer>
    </Wrapper>
  );
};
