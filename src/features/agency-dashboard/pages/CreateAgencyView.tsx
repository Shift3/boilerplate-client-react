import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { CreateAgencyForm } from '../components/CreateAgencyForm';

export const CreateAgencyView: FC = () => {
  const history = useHistory();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = () => {
    console.log('submitted');
  };

  return (
    <Container>
      <CreateAgencyForm onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
    </Container>
  );
};
