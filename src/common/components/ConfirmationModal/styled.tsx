import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import styled from 'styled-components';

// Based on the styled-components docs at https://styled-components.com/docs/api#caveat-with-function-components,
// in order for typechecking to work correctly with styled components that extend a function components, we need
// to define the component and it's type first as done here.
const BootstrapModal: FC<ModalProps> = ({ children, ...rest }) => <Modal {...rest}>{children}</Modal>;
const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

export const StyledModal = styled(BootstrapModal)`
  & .modal-header {
    border: none;
  }

  & .modal-content {
    padding: 50px;
    background-color: ${(props) => props.theme.primary};
    border-color: ${(props) => props.theme.primary};
  }

  & .modal-title {
    color: ${(props) => props.theme.cardHeader};
  }

  & .modal-body {
    padding: 10px 0;
    color: white;
  }

  & .modal-footer {
    margin-top: 50px;
    padding: 0;
    border: none;
    justify-content: center;
  }

  button:first-of-type {
    margin-right: 10px;
  }
`;

export const StyledCancelButton = styled(BootstrapButton)`
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;

  &,
  &:hover,
  &:active,
  &:focus {
    background-color: ${(props) => props.theme.primary} !important;
    border-color: ${(props) => props.theme.primaryBorder} !important;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(52 58 64 / 50%);
  }
`;

export const StyledConfirmButton = styled(BootstrapButton)`
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;

  &,
  &:hover,
  &:active,
  &:focus {
    background-color: ${(props) => props.theme.accent} !important;
    border-color: ${(props) => props.theme.accentBorder} !important;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(52 58 64 / 50%);
  }
`;
