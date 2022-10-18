import { FC } from 'react';
import { Spinner, SpinnerProps } from 'react-bootstrap';

export const LoadingSpinner: FC<Partial<SpinnerProps>> = ({
  animation = 'border',
  variant = 'primary',
  role = 'status',
  ...rest
}) => (
  <Spinner id='loading-spinner' animation={animation} variant={variant} role={role} {...rest}>
    <span className='visually-hidden'>Loading...</span>
  </Spinner>
);
