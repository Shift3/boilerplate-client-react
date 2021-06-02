import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';

export const StyledForm = styled(Form)`
  background-color: ${(props) => props.theme.primary};
  padding: 40px;
  border-radius: 5px;
  width: 400px;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.cardHeader};
  font-size: 2em;
  font-style: bold;
  padding-bottom: 10px;
`;
export const FieldTitle = styled.div`
  color: white;
`;

export const Error = styled.div`
  /* color: white; */
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CancelButton = styled(Button)`
  color: white;
  background-color: ${(props) => props.theme.primary};
  border: 1px solid white;
  margin-right: 20px;
`;

export const SignUpButton = styled(Button)`
  color: white;
  background-color: red;
`;
