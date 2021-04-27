import { Button } from 'react-bootstrap';
import { IButtonProps, CustomButtonType } from './types';

export const CustomButton: CustomButtonType = ({
  backgroundColor,
  color,
  onClick,
  disabled,
  text,
  width,
}: IButtonProps) => (
  <Button style={{ backgroundColor, color, width }} onClick={onClick} disabled={disabled}>
    {text}
  </Button>
);
