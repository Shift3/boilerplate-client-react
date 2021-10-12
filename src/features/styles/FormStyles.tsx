// import styled from 'styled-components';
// import { Button, Form } from 'react-bootstrap';

// export const StyledForm = styled(Form)`
//   background-color: ${(props) => props.theme.forms.backgroundColor};
//   padding: 40px;
//   border-radius: 5px;
//   width: 400px;
// `;

// export const Title = styled.div`
//   color: ${(props) => props.theme.cardHeader};
//   font-size: 2em;
//   font-style: bold;
//   padding-bottom: 10px;
// `;
// export const FormLabel = styled(Form.Label)`
//   color: black;
// `;

// export const InputError = styled.span`
//   color: lightgrey;
// `;

// export const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding-top: 10px;
// `;

// export const CancelButton = styled(Button)`
//   color: white;
//   background-color: ${(props) => props.theme.primary};
//   border: 1px solid #679daa;
//   margin-right: 20px;
// `;

// export const SubmitButton = styled(Button)`
//   color: white;
//   background-color: ${(props) => props.theme.accent};
// `;

import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

export const StyledFormWrapper = styled.div`
  max-width: 500px;
  min-width: 500px;
  padding: 50px;
  background-color: ${(props) => props.theme.forms.backgroundColor};
  border-radius: 0.25rem;
  & label {
    color: white;
  }
  & .invalid-feedback {
    /* Modify style of validation error messages here */
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

export const FormLabel = styled(Form.Label)`
  color: ${(props) => props.theme.forms.labelColor};
  margin-bottom: 5px;
`;

export const FormControl = styled(Form.Control)`
  color: ${(props) => props.theme.forms.control};
  margin-bottom: 20px;
`;

export const InputError = styled.span`
  color: ${(props) => props.theme.forms.inputError};
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
