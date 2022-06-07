import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledOptionButton = styled(Button)<{
  topLeftBorderRadius?: number;
  topRightBorderRadius?: number;
  bottomRightBorderRadius?: number;
  bottomLeftBorderRadius?: number;
}>`
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  color: #212529;
  border-top-left-radius: ${props => `${props.topLeftBorderRadius ?? 0}px`};
  border-top-right-radius: ${props => `${props.topRightBorderRadius ?? 0}px`};
  border-bottom-right-radius: ${props => `${props.bottomRightBorderRadius ?? 0}px`};
  border-bottom-left-radius: ${props => `${props.bottomLeftBorderRadius ?? 0}px`};

  &:disabled {
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    color: #212529;
  }
`;
