import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.authBackground};
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftForm = styled.div``;

export const CreateAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.primary};
`;

export const Title = styled.div`
  color: ${(props) => props.theme.cardHeader};
  font-size: 2em;
  font-style: bold;
  padding-bottom: 10px;
`;

export const Text = styled.div``;

export const CreateAccountButton = styled(Button)``;
