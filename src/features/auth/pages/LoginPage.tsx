import { useLogin } from 'features/auth/hooks';
import { FC } from 'react';
import styled from 'styled-components';
import { ForgotPasswordLink } from '../components/ForgotPasswordLink';
import { useHistory } from 'react-router-dom';
import { FormData, LoginForm } from '../components/LoginForm';
import { ButtonWrapper, SubmitButton, Title } from 'features/styles/PageStyles';
import Container from 'react-bootstrap/Container';

const Wrapper = styled(Container).attrs({ fluid: true })`
  @media (min-width: 890px) {
    max-width: 850px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const StyledContainer = styled.div`
  background-color: ${(props) => props.theme.forms.backgroundColor};
  border-radius: 5px;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 850px;

  @media (max-width: 889px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  padding: 50px;
`;

const LeftColumn = styled(Column)`
  width: 60%;

  @media (max-width: 889px) {
    width: 100%;
    padding-bottom: 0;
  }
`;

const RightColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  margin-bottom: 78px;

  @media (max-width: 889px) {
    width: 100%;
    margin-bottom: 0;
  }
`;

export const LogInPage: FC = () => {
  const history = useHistory();
  const { login } = useLogin();

  const onSubmit = async (credentials: FormData) => {
    login(credentials);
  };

  const onCancel = () => history.push('/auth/login');

  const navigateToSignup = () => history.push('/auth/signup');

  return (
    <Wrapper>
      <StyledContainer>
        <Grid>
          <LeftColumn>
            <Title>Member Log In</Title>
            <LoginForm onSubmit={onSubmit} onCancel={onCancel} />
            <ForgotPasswordLink />
          </LeftColumn>
          <RightColumn>
            <Title>Haven&apos;t Registered Yet?</Title>
            <p>Registering for your account is quick and easy.</p>
            <ButtonWrapper>
              <SubmitButton onClick={navigateToSignup}>CREATE ACCOUNT</SubmitButton>
            </ButtonWrapper>
          </RightColumn>
        </Grid>
      </StyledContainer>
    </Wrapper>
  );
};
