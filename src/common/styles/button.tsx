import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

export const TableActionsStyling = styled.div`
  & > svg {
    color: ${props => props.theme.textColor};
  }
`;

export const ActionButtonStyles = styled(BootstrapButton).attrs({
  variant: 'default',
})`
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  color: ${props => props.theme.textColor};
  font-size: 0.8rem;
  border: 1px solid #ccc;
  background: ${props => props.theme.buttons.defaultBackgroundColor};
  border-color: ${props => props.theme.buttons.defaultBorderColor};
  font-weight: 400;
  transition: 0.15s ease all;
  padding: 2px 8px;
  white-space: nowrap;

  &:hover {
    background: ${props => props.theme.backgroundColor};
    border: 1px solid #ccc;
    color: ${props => props.theme.textColor};
    box-shadow: none;
  }

  &:active,
  &:focus {
    background: ${props => props.theme.card.backgroundColor};
    color: ${props => props.theme.textColor};
    border: 1px solid #ccc;
    box-shadow: none;
  }
`;

export type ActionButtonProps = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  show?: boolean;
};

export const ActionButton: FC<ActionButtonProps> = ({ text, onClick, show }) =>
  show ? (
    <ActionButtonStyles role='button' tabIndex={0} onClick={onClick}>
      {text}
    </ActionButtonStyles>
  ) : null;
