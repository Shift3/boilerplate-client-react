import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

export const CreateButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.createTextColor};
  background-color: ${props => props.theme.buttons.createBackgroundColor};
  border-color: ${props => props.theme.buttons.createBorderColor};
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;

  &:hover {
    background-color: ${props => props.theme.buttons.createHoverBackgroundColor};
    border-color: ${props => props.theme.buttons.createHoverBorderColor};
  }
`;

export const CancelButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.cancelTextColor};
  background-color: ${props => props.theme.buttons.cancelBackgroundColor};
  border-color: ${props => props.theme.buttons.cancelBorderColor};
  padding: 0.5rem 1rem;
  width: 40%;
`;

export const SubmitButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.submitTextColor};
  background-color: ${props => props.theme.buttons.submitBackgroundColor};
  border-color: ${props => props.theme.buttons.submitBorderColor};
  padding: 0.5rem 1rem;
  width: 40%;
`;

export const CustomButton = styled(BootstrapButton)`
  background-color: ${props => props.theme.buttons.backgroundColor};
  border-color: ${props => props.theme.buttons.backgroundColor};
  color: ${props => props.theme.buttons.text};
  width: ${props => props.theme.buttons.width};

  &:hover {
    background-color: ${props => props.theme.buttons.hoverBackgroundColor};
    border-color: ${props => props.theme.buttons.hoverBorderColor};
  }

  &:disabled {
    background-color: ${props => props.theme.buttons.disabledBackgroundColor};
    border-color: ${props => props.theme.buttons.disabledBorderColor};
  }
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
