import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.authBackground};
  padding-top: 200px;
`;
export const LoginWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 50%;
  height: 50%;
  padding: 40px;
  display: flex;
  margin-left: 100px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 5px;
`;

export const LeftLogin = styled.div``;

export const RightLogin = styled.div``;

export const Title = styled.div`
  color: ${(props) => props.theme.cardHeader};
  font-size: 2em;
  font-style: bold;
  padding-bottom: 10px;
`;

export const Text = styled.div``;

export const CreateAccountButton = styled(Button)``;
