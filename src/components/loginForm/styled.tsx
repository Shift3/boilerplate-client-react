import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.forms.backgroundColor};
  border: 2px solid red;
  padding: 20px;
`;

export const Login = styled.div``;

export const Register = styled.div``;

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
  padding-top: 10px;
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

export const LinkWrapper = styled.div`
  padding-bottom: 30px;
  font-size: 1.2em;
`;
