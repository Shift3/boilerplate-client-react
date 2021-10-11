import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const CustomButton = styled(Button)`
  background-color: ${(props) => props.theme.buttons.backgroundColor};
  border: none;
  color: ${(props) => props.theme.buttons.text};

  width: ${(props) => props.theme.buttons.width};
  &:hover {
    background-color: ${(props) => props.theme.buttons.hoverBackgroundColor};
    /* Leaving these style values comments for reference
    border-color: ${(props) => props.theme.buttons.hoverBorderColor}; */
  }
  &:disabled {
    background-color: ${(props) => props.theme.buttons.disabledBackgroundColor};
    /* Leaving these style values comments for reference
    border-color: ${(props) => props.theme.disabledBorderColor}; */
  }
`;
