import { useLogin } from 'features/auth/hooks';
import { FC } from 'react';
import styled from 'styled-components';
import { FormData, LogInForm } from '../components/LoginForm';
import { ForgotPasswordLink } from '../components/ForgotPasswordLink';
import { RegisterCallToAction } from '../components/RegisterCallToAction';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${props => props.theme.app.backgroundColor};
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  height: 50%;
  width: 850px;
  min-height: 420px;
  padding: 60px;
  background-color: ${props => props.theme.forms.backgroundColor};
`;

const LeftColumn = styled.div`
  width: 55%;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
`;

const Title = styled.div`
  color: ${props => props.theme.forms.title};
  font-size: 2.4em;
  font-style: bold;
  margin-bottom: 5px;
`;

export const LogInPage: FC = () => {
  const { login } = useLogin();

  const onSubmit = async (credentials: FormData) => {
    await login(credentials);
  };

  return (
    <Wrapper data-testid='wrapper'>
      <StyledContainer>
        <LeftColumn>
          <Title>Member Log In</Title>
          <LogInForm onSubmit={onSubmit} />
          <ForgotPasswordLink />
        </LeftColumn>
        <RightColumn>
          <RegisterCallToAction />
        </RightColumn>
      </StyledContainer>
    </Wrapper>
  );
};
