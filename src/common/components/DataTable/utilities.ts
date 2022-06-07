import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const getBorderRadiusValue = (radii: string, corner: string): number => {
  const radiusArray = radii.split(';');

  switch (corner) {
    case 'topLeft':
      return Number(radiusArray[0]);
    case 'topRight':
      return Number(radiusArray[1]);
    case 'bottomRight':
      return Number(radiusArray[2]);
    case 'bottomLeft':
      return Number(radiusArray[3]);
    default:
      return 0;
  }
};

export const StyledOptionButton = styled(Button)<{
  radii: string;
}>`
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  color: #212529;
  border-top-left-radius: ${props => `${getBorderRadiusValue(props.radii, 'topLeft') ?? 0}px`};
  border-top-right-radius: ${props => `${getBorderRadiusValue(props.radii, 'topRight') ?? 0}px`};
  border-bottom-right-radius: ${props => `${getBorderRadiusValue(props.radii, 'bottomRight') ?? 0}px`};
  border-bottom-left-radius: ${props => `${getBorderRadiusValue(props.radii, 'bottomLeft') ?? 0}px`};

  &:disabled {
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    color: #212529;
  }
`;
