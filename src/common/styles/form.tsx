import { FC } from 'react';
import Form, { FormProps } from 'react-bootstrap/Form';
import styled from 'styled-components';

const BootstrapForm: FC<FormProps> = ({ children, ...rest }) => <Form {...rest}>{children}</Form>;

export const Title = styled.p`
  color: ${props => props.theme.forms.titleColor};
  font-size: 2em;
  font-weight: 500;
`;

export const StyledForm = styled(BootstrapForm)`
  background-color: ${props => props.theme.forms.backgroundColor};
  padding: 40px;
  border-radius: 5px;
  width: 400px;
`;

export const StyledFormWrapper = styled.div`
  margin: 1rem 0;
  max-width: 500px;
  min-width: 500px;
  padding: 50px;
  background-color: ${props => props.theme.forms.backgroundColor};
  border-radius: 0.25rem;
  & label {
    color: ${props => props.theme.forms.labelColor};
    margin: 5px;
  }
  & .form-control.is-invalid,
  .form-select.is-invalid {
    border-color: ${props => props.theme.forms.errorBorderColor};
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
    color: ${props => props.theme.forms.errorTextColor};
    padding-bottom: 5px;
  }
  & control {
    color: ${props => props.theme.forms.control};
  }
`;
