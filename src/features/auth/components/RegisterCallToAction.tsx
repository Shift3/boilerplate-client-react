import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div``;

const Title = styled.div`
  color: ${props => props.theme.forms.titleColor};
  font-size: 2.4em;
  font-style: bold;
  width: 90%;
  min-width: 180px;
  min-height: 24px;
  padding-bottom: 12px;
`;

const CreateAccountButton = styled(Button)`
  color: ${props => props.theme.forms.white};
  background-color: ${props => props.theme.forms.buttonColor};
`;

const Text = styled.div`
  color: ${props => props.theme.forms.textColor};
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const RegisterCallToAction: FC = () => {
  const navigate = useNavigate();

  const navigateToSignup = () => navigate('/auth/signup');

  return (
    <Wrapper>
      <Title data-testid='loginPageInfoHeading'>Need to Register?</Title>
      <Text>
        <p data-testid='loginPageInfoContent'>Registering for your account is quick and easy.</p>
      </Text>
      <CreateAccountButton data-testid='createAccountButton' onClick={navigateToSignup}>
        CREATE ACCOUNT
      </CreateAccountButton>
    </Wrapper>
  );
};
