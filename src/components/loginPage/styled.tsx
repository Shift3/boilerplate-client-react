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

export const FormLeft = styled.div``;

export const FormRight = styled.div``;

export const CreateAccountButton = styled(Button)``;
