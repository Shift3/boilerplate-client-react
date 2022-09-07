import { FC, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

export const FluidContainer: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Container fluid className='px-0'>
      {children}
    </Container>
  );
};
