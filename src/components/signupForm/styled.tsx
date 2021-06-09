import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Wrapper = styled.form`
  background-color: ${(props) => props.theme.primary};
  padding: 40px;
  border-radius: 5px;
  max-width: 40%;
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

export const StyledButton = styled(Button)`
  color: white;
  background: red;
  border: none;
`;
