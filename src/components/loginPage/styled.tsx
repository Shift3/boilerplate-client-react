import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.authBackground};
  justify-content: center;
  align-items: center;
  padding-top: 200px;
  padding-left: 200px;
`;
export const LoginWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 50vw;
  height: 50vh;
  padding: 40px;
  display: flex;
  margin-left: 100px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 5px;
`;

export const LeftLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const LinkWrapper = styled.div`
  color: white;
  padding-bottom: 30px;
`;

export const RightLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  max-width: 350px;
  min-height: 400px;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.cardHeader};
  font-size: 2em;
  font-style: bold;
  padding-bottom: 10px;
`;

export const Text = styled.div`
  color: white;
`;

export const CreateAccountButton = styled(Button)``;
