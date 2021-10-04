import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

export const Login = styled.div`
  padding: 20px;
`;

export const FormLabel = styled(Form.Label)`
  color: ${(props) => props.theme.forms.label};
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
