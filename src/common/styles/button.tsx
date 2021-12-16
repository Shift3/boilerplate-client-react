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
    color: #333;

    path {
      fill: #333;
    }

    &:hover,
    &:focus {
      background: transparent;
      border: none;
      color: #333;
      path {
        fill: #333;
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
    border-radius: 6px;

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


export const ActionButton = styled(BootstrapButton)`
    border-radius: 6px;
    border: none;
    color: #333;
    font-size: 0.8rem;
    border: 1px solid #ccc;
    background: white;
    font-weight: 400;
    transition: 0.15s ease all;
    padding: 2px 8px;
    white-space: nowrap;

    &:hover {
      background: #ddd;
      border: 1px solid #ccc;
      color: #333;
      box-shadow: none;
    }

    &:active, &:focus {
      background: white;
      color: #333;
      border: 1px solid #ccc;
      box-shadow: none;
    }
`;

export const SecondaryButton = styled(BootstrapButton)`
  color: #60A5FA;
  background: #DBEAFE;
  border: 1px solid #DBEAFE;
  padding: 0.4rem 1rem;
  border-radius: 6px;

  &:hover {
    background: #BFDBFE;
    color: #3B82F6;
    border: 1px solid #DBEAFE;
  }
`;

export const CreateButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.primaryTextColor};
  background-color: ${props => props.theme.buttons.primaryBackgroundColor};
  border-color: ${props => props.theme.buttons.primaryBorderColor};
  padding: 0.4rem 1rem;
  border-radius: 6px;

  &:hover {
    background-color: ${props => props.theme.buttons.primaryHoverBackgroundColor};
    border-color: ${props => props.theme.buttons.primaryHoverBorderColor};
  }
`;

export const CancelButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.cancelTextColor};
  background-color: ${props => props.theme.buttons.cancelBackgroundColor};
  border-color: ${props => props.theme.buttons.cancelBorderColor};
  padding: 0.4rem 1rem;
  border-radius: 6px;

  &:hover {
    background-color: ${props => props.theme.buttons.cancelBackgroundColor};
    border-color: ${props => props.theme.buttons.cancelBorderColor};
    color: black;
  }
`;

export const LoginButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.submitTextColor};
  background-color: ${props => props.theme.buttons.submitBackgroundColor};
  border-color: ${props => props.theme.buttons.submitBorderColor};
  padding: 0.5rem 1rem;

  & .spinner-border {
    margin-right: 1em;
  }
`;

export const CustomButton = styled(BootstrapButton)`
  background-color: ${props => props.theme.buttons.backgroundColor};
  border-color: ${props => props.theme.buttons.backgroundColor};
  color: ${props => props.theme.buttons.text};
  width: ${props => props.theme.buttons.width};
  padding: 0.4rem 1rem;
  border-radius: 6px;

  &:hover {
    background-color: ${props => props.theme.buttons.hoverBackgroundColor};
    border-color: ${props => props.theme.buttons.hoverBorderColor};
  }

  &:disabled {
    background-color: ${props => props.theme.buttons.disabledBackgroundColor};
    border-color: #999;
    border: ${props => props.theme.buttons.disabledBackgroundColor};;
    color: #999;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  & button {
    margin-right: 10px;
    border-radius: 6px;
  }

  & button:last-of-type {
    margin-right: 0;
  }
`;
