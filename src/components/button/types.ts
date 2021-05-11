import { FC } from 'react';
import { ButtonProps } from 'react-bootstrap';

export interface IButtonProps extends ButtonProps {
  backgroundColor: string;
  color: string;
  width: string;
}

export type CustomButtonType = FC<IButtonProps>;
