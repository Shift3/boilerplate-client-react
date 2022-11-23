import { FC, PropsWithChildren } from 'react';
import { Button, ButtonProps, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

const LoadingButtonStyles = styled.span`
  .spinner-container {
    padding-right: 8px;
  }
`;

export const LoadingButton: FC<PropsWithChildren<LoadingButtonProps>> = ({ loading, children, disabled, ...rest }) => {
  return (
    <Button {...rest} disabled={disabled || loading}>
      <LoadingButtonStyles>
        {loading ? (
          <span className='spinner-container'>
            <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
          </span>
        ) : null}

        {children}
      </LoadingButtonStyles>
    </Button>
  );
};
