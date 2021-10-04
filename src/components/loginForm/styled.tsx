import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  display: flex;
  background-color: ${(props) => props.theme.forms.backgroundColor};
  border: 2px solid red;
  padding: 80px;
`;

export const Login = styled.div`
  padding: 20px;
`;

export const Register = styled.div`
  align-items: center;
  padding: 20px;
  width: 20vw;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.forms.title};
  font-size: 2em;
  font-style: bold;
  padding-bottom: 10px;
`;

export const FormLabel = styled(Form.Label)`
  ${(props) => props.theme.forms.label};
`;

export const InputError = styled.span`
  color: lightgrey;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const CancelButton = styled(Button)`
  color: ${(props) => props.theme.forms.white};
  background-color: ${(props) => props.theme.forms.buttonColor};
  border: 1px solid #679daa;
  margin-right: 20px;
`;

export const LogInButton = styled(Button)`
  color: ${(props) => props.theme.forms.white};
  background-color: ${(props) => props.theme.forms.buttonColor};
  border: none;
`;

export const CreateAccountButton = styled(Button)`
  color: ${(props) => props.theme.forms.white};
  background-color: ${(props) => props.theme.forms.buttonColor};
`;

export const Text = styled.div`
  ${(props) => props.theme.forms.text};
`;

export const ForgotPassword = styled.div`
  font-size: 1.2em;
`;
