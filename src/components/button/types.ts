export interface IButtonProps {
  backgroundColor: string;
  color: string;
  text: string;
  width: string;
  onClick?: () => void;
  type: 'button' | 'reset' | 'submit';
  disabled: boolean;
}

export type CustomButtonType = ({
  backgroundColor,
  color,
  onClick,
  disabled,
  text,
  type,
  width,
}: IButtonProps) => JSX.Element;
