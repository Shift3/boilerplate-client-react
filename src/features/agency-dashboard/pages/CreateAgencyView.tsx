import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { CreateAgencyForm } from '../components/CreateAgencyForm';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';

export const CreateAgencyView: FC = () => {
  const history = useHistory();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = () => {
    console.log('submitted');
  };

  return (
    <Container className=''>
      <StyledFormWrapper>
        <StyledFormTitle>Create Agency</StyledFormTitle>
        <CreateAgencyForm onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </Container>
  );
};
