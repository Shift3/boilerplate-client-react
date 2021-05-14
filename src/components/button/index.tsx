import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { CustomButtonType } from './types';

export const CustomButton = styled<CustomButtonType>(Button)`
  background-color: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  &:hover {
    background-color: ${(props) => props.backgroundColor};
    border-color: ${(props) => props.backgroundColor};
  }
`;
