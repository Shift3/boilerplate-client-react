/* eslint-disable max-len */
import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.pages.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledFormWrapper = styled.div`
  margin: 100px;
  max-width: 500px;
  min-width: 500px;
  padding: 50px;
  background-color: ${(props) => props.theme.forms.backgroundColor};
  border-radius: 0.25rem;
  & label {
    color: ${(props) => props.theme.forms.labelColor};
    margin: 5px;
  }
  & .form-control.is-invalid,
  .form-select.is-invalid {
    border-color: ${(props) => props.theme.forms.errorBorderColor};
  }

  & .form-control.is-invalid,
  .was-validated .form-control:invalid {
    background-image: none;
  }

  & .form-select.is-invalid:not([multiple]):not([size]),
  .form-select.is-invalid:not([multiple])[size='1'],
  .was-validated .form-select:invalid:not([multiple]):not([size]),
  .was-validated .form-select:invalid:not([multiple])[size='1'] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  }

  & .invalid-feedback {
    /* Modify style of validation error messages here */
    color: ${(props) => props.theme.forms.errorTextColor};
    padding-bottom: 5px;
  }
  & control {
    color: ${(props) => props.theme.forms.control};
  }
`;

export const StyledForm = styled(Form)`
  background-color: ${(props) => props.theme.forms.backgroundColor};
  padding: 40px;
  border-radius: 5px;
  width: 400px;
`;

export const Title = styled.p`
  color: ${(props) => props.theme.forms.titleColor};
  font-size: 2em;
  font-weight: 500;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  & button {
    margin-right: 10px;
  }

  & button:last-of-type {
    margin-right: 0;
  }
`;

export const CancelButton = styled(BootstrapButton)`
  color: ${(props) => props.theme.buttons.cancelTextColor};
  background-color: ${(props) => props.theme.buttons.cancelBackgroundColor};
  border-color: ${(props) => props.theme.buttons.cancelBorderColor};
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;
`;

export const SubmitButton = styled(BootstrapButton)`
  color: ${(props) => props.theme.buttons.submitTextColor};
  background-color: ${(props) => props.theme.buttons.submitBackgroundColor};
  border-color: ${(props) => props.theme.buttons.submitBorderColor};
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;
`;

export const FlashMessageContainer = styled.div`
  z-index: 1;
`;

export const CreateButton = styled(BootstrapButton)`
  color: ${(props) => props.theme.buttons.createTextColor};
  background-color: ${(props) => props.theme.buttons.createBackgroundColor};
  border-color: ${(props) => props.theme.buttons.createBorderColor};
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;

  &:hover {
    background-color: ${(props) => props.theme.buttons.createHoverBackgroundColor};
    border-color: ${(props) => props.theme.buttons.createHoverBorderColor};
  }
`;

export const CustomButton = styled(Button)`
  background-color: ${(props) => props.theme.buttons.backgroundColor};
  border: none;
  color: ${(props) => props.theme.buttons.text};

  width: ${(props) => props.theme.buttons.width};
  &:hover {
    background-color: ${(props) => props.theme.buttons.hoverBackgroundColor};
    /* Leaving these style values comments for reference
    border-color: ${(props) => props.theme.buttons.hoverBorderColor}; */
  }
  &:disabled {
    background-color: ${(props) => props.theme.buttons.disabledBackgroundColor};
    /* Leaving these style values comments for reference
    border-color: ${(props) => props.theme.disabledBorderColor}; */
  }
`;
