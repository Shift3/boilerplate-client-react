import { FC } from 'react';
import { Spinner } from 'react-bootstrap';

export const LoadingSpinner: FC = () => (
  <div className='py-3 text-center'>
    <Spinner animation='border' variant='primary' role='status' style={{ width: '4em', height: '4em' }}>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  </div>
);
