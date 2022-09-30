import { FC } from 'react';
import { Spinner } from 'react-bootstrap';

export const LoadingSpinner: FC = () => (
  <Spinner id='loading-spinner' animation='border' variant='primary' role='status'>
    <span className='visually-hidden'>Loading...</span>
  </Spinner>
);
