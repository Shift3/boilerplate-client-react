import { FC } from 'react';
import { Button, ButtonProps, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = Button;

const CancelButton = styled(BootstrapButton).attrs({
  variant: 'danger',
})`
  width: 100px;
`;

interface LoadingButtonProps extends Omit<ButtonProps, 'as'> {
  loading: boolean;
  as: FC<ButtonProps>;
}

export const LoadingButton: FC<LoadingButtonProps> = ({ as: ButtonComponent, loading, children, ...buttonProps }) => {
  return (
    <ButtonComponent {...buttonProps} disabled={loading}>
      {loading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />}
      {children}
    </ButtonComponent>
  );
};
