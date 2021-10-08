import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FC } from 'react';

const Wrapper = styled.div``;

const Title = styled.div`
  color: ${(props) => props.theme.forms.titleColor};
  font-size: 2.4em;
  font-style: bold;
  width: 90%;
  min-width: 180px;
  min-height: 24px;
`;

const CreateAccountButton = styled(Button)`
  color: ${(props) => props.theme.forms.white};
  background-color: ${(props) => props.theme.forms.buttonColor};
`;

const Text = styled.div`
  color: ${(props) => props.theme.forms.textColor};
`;

export const RegisterCallToAction: FC = () => {
  const history = useHistory();

  const navigateToSignup = () => history.push('/auth/signup');

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
