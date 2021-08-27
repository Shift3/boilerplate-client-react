import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { CreateAgencyForm } from '../components/CreateAgencyForm';

export const CreateAgencyView: FC = () => {
  return (
    <Container>
      <CreateAgencyForm />
    </Container>
  );
};
