import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

type LoadingButtonProps = ButtonProps & { loading: boolean };

const StyledButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.submitTextColor};
  background-color: ${props => props.theme.buttons.submitBackgroundColor};
  border-color: ${props => props.theme.buttons.submitBorderColor};
  padding: 0.5rem 1rem;
  width: 40%;

  & .spinner-border {
    margin-right: 1em;
  }
`;

export const LoadingButton: FC<LoadingButtonProps> = ({ onClick, disabled, loading, children,  }) => {
  return (
    <StyledButton disabled={disabled || loading} onClick={onClick}>
      {loading && <span className='spinner-border spinner-border-sm' />}
      {children}
    </StyledButton>
  );
};
