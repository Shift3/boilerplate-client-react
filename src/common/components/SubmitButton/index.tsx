import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

type SubmitButtonProps = {
  disabled?: boolean,
  loading?: boolean,
};

const StyledSubmitButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.submitTextColor};
  background-color: ${props => props.theme.buttons.submitBackgroundColor};
  border-color: ${props => props.theme.buttons.submitBorderColor};
  padding: 0.5rem 1rem;
`;

export const SubmitButton: FC<SubmitButtonProps> = ({ disabled, loading, children }) => {

  return (
    <StyledSubmitButton type='submit' disabled={disabled || loading }>
    {loading && <span className="spinner-border spinner-border-sm mr-1"/>}
      {children}
    </StyledSubmitButton>
  )
};

