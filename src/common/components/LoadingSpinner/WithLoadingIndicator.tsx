import { FC } from 'react';
import { Spinner } from 'react-bootstrap';

export type Props = {
  isLoading: boolean;
};

export const WithLoadingIndicator: FC<Props> = ({ isLoading, children }) =>
  isLoading ? <Spinner animation='border' variant='primary'></Spinner> : <>{children}</>;
