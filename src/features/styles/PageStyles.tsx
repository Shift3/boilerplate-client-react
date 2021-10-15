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
  }
  & .invalid-feedback {
    /* Modify style of validation error messages here */
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
