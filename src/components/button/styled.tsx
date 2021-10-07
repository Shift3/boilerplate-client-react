import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const CustomButton = styled(Button)`
  background-color: ${(props) => props.theme.buttons.backgroundColor};
  border: none;
  color: ${(props) => props.theme.buttons.text};
  /* color: ${(props) => props.theme.color}; */
  width: ${(props) => props.theme.width};
  */ &:hover {
    background-color: ${(props) => props.theme.buttons.hoverBackgroundColor};
    /* border-color: ${(props) => props.theme.buttons.hoverBorderColor}; */
  }
  &:disabled {
    background-color: ${(props) => props.theme.buttons.disabledBackgroundColor};
    /* border-color: ${(props) => props.theme.disabledBorderColor}; */
  }
`;

// CustomButton.defaultProps = {
//   theme: {
//     backgroundColor: accent,
//     borderColor: accent,
//     color: '#fff',
//     disabledBackgroundColor: accentDisabled,
//     disabledBorderColor: accent,
//     hoverBackgroundColor: accent,
//     hoverBorderColor: accent,
//     width: '90%',
//   },
// };
