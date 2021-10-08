import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

export const Login = styled.div`
  padding: 20px;
`;

export const FormLabel = styled(Form.Label)`
  color: ${(props) => props.theme.forms.label};
  margin-bottom: 5px;
`;

export const FormControl = styled(Form.Control)`
  color: ${(props) => props.theme.forms.control};
  margin-bottom: 20px;
`;

export const InputError = styled.span`
  color: ${(props) => props.theme.forms.inputError};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
`;

export const CancelButton = styled(Button)`
  color: ${(props) => props.theme.forms.white};
  background-color: ${(props) => props.theme.forms.buttonColor};
  min-width: 180px;
  min-height: 24px;
`;

export const LogInButton = styled(Button)`
  color: ${(props) => props.theme.forms.white};
  background-color: ${(props) => props.theme.forms.buttonColor};
  border: none;
  min-width: 180px;
  min-height: 24px;
`;
