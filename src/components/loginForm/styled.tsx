import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  padding: 60px;
  border-radius: 5px;
  min-width: 450px;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.cardHeader};
  font-size: 2em;
  font-style: bold;
  padding-bottom: 10px;
`;

export const FormLabel = styled(Form.Label)`
  color: white;
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
  color: white;
  background-color: ${(props) => props.theme.primary};
  border: 1px solid #679daa;
  margin-right: 20px;
`;

export const LogInButton = styled(Button)`
  color: white;
  background-color: ${(props) => props.theme.accent};
  border: none;
`;
