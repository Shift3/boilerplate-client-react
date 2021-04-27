import { Button } from 'react-bootstrap';
import { IButtonProps, CustomButtonType } from './types';

export const CustomButton: CustomButtonType = ({
  backgroundColor,
  color,
  onClick,
  type,
  disabled,
  text,
  width,
}: IButtonProps) => (
  <Button type={type} style={{ backgroundColor, color, width }} onClick={onClick} disabled={disabled}>
    {text}
  </Button>
);
