import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

type SubmitButtonProps = {
  text?: string;
};

const StyledSubmitButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.submitTextColor};
  background-color: ${props => props.theme.buttons.submitBackgroundColor};
  border-color: ${props => props.theme.buttons.submitBorderColor};
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;
`;

export const SubmitButton: FC<SubmitButtonProps> = ({ text }) => {
  const {
    formState: { isValid, isSubmitting }
  } = useForm();

  return (
    <StyledSubmitButton type='submit' disabled={!isValid || isSubmitting} className="btn btn-primary mr-1">
    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"/>}
      {text}
    </StyledSubmitButton>
  )
};

