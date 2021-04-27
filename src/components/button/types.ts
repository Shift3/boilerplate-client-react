export interface IButtonProps {
  backgroundColor: string;
  color: string;
  text: string;
  width: string;
  onClick: () => void;
  disabled: boolean;
}

export type CustomButtonType = ({
  backgroundColor,
  color,
  onClick,
  disabled,
  text,
  width,
}: IButtonProps) => JSX.Element;
