import { FC } from 'react';
import { ButtonProps, Spinner } from 'react-bootstrap';

interface LoadingButtonProps extends Omit<ButtonProps, 'as'> {
  loading: boolean;
  as: FC<ButtonProps>;
}

export const LoadingButton: FC<LoadingButtonProps> = ({
  as: ButtonComponent,
  loading,
  children,
  disabled,
  ...buttonProps
}) => {
  return (
    <ButtonComponent {...buttonProps} disabled={disabled || loading}>
      {loading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />}
      {children}
    </ButtonComponent>
  );
};
