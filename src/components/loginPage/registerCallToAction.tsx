import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FC } from 'react';

export const Register = styled.div``;

export const Title = styled.div`
  color: ${(props) => props.theme.forms.title};
  font-size: 2em;
  font-style: bold;
`;

export const CreateAccountButton = styled(Button)`
  color: ${(props) => props.theme.forms.white};
  background-color: ${(props) => props.theme.forms.buttonColor};
`;

export const Text = styled.div`
  ${(props) => props.theme.forms.text};
`;

export const RegisterCallToAction: FC = () => {
  const history = useHistory();

  const navigateToSignup = () => history.push('/auth/signup');

  return (
    <Register>
      <Title data-testid='loginPageInfoHeading'>Need to Register?</Title>
      <Text>
        <p data-testid='loginPageInfoContent'>Registering for your account is quick and easy.</p>
      </Text>
      <CreateAccountButton data-testid='createAccountButton' onClick={navigateToSignup}>
        CREATE ACCOUNT
      </CreateAccountButton>
    </Register>
  );
};
