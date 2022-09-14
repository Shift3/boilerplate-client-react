import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

export const TableActions = styled.div`
  position: relative;
  width: 100%;

  & > button {
    border: none;
    background: transparent;
    color: ${props => props.theme.textColor};

    path {
      fill: ${props => props.theme.textColor};
    }

    &:hover,
    &:focus {
      background: transparent;
      border: none;
      color: ${props => props.theme.textColor};
      path {
        color: ${props => props.theme.textColor};
      }
    }
  }

  div {
    transition-timing-function: ease;
    transition-duration: 0.5s;
    transition-property: max-width, opacity, padding-right;
    opacity: 0;
    max-width: 0;
    position: absolute;
    right: 2rem;
    background: transparent;
    overflow: hidden;
    top: calc(50% - 1px);
    transform: translateY(-50%);
    white-space: nowrap;
    padding: 0;
    border-radius: ${props => props.theme.borderRadius};

    button {
      display: inline-block;

      &:first-of-type:not(:last-of-type) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &:last-of-type:not(:first-of-type) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: none;
      }

      &:not(:first-of-type):not(:last-of-type) {
        border-radius: 0;
        border-left: none;
      }
    }
  }

  & > button:hover + div,
  & > button:focus + div,
  div:hover {
    padding: 1rem;
    max-width: 100vw;
    opacity: 1;
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
