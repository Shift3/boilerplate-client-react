import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import StyleValues from '../../utils/styleValues';

const { accent, accentDisabled } = StyleValues;

export const CustomButton = styled(Button)`
  background-color: ${(props) => props.theme.backgroundColor};
  border-color: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.color};
  width: ${(props) => props.theme.width};
  &:hover {
    background-color: ${(props) => props.theme.hoverBackgroundColor};
    border-color: ${(props) => props.theme.hoverBorderColor};
  }
  &:disabled {
    background-color: ${(props) => props.theme.disabledBackgroundColor};
    border-color: ${(props) => props.theme.disabledBorderColor};
  }
`;

CustomButton.defaultProps = {
  theme: {
    backgroundColor: accent,
    borderColor: accent,
    color: '#fff',
    disabledBackgroundColor: accentDisabled,
    disabledBorderColor: accent,
    hoverBackgroundColor: accent,
    hoverBorderColor: accent,
    width: '90%'
  }
};