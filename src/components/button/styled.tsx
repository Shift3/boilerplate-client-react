import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const CustomButton = styled(Button)`
  background-color: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  &:hover {
    background-color: ${(props) => props.backgroundColor};
    border-color: ${(props) => props.backgroundColor};
  }
`;
