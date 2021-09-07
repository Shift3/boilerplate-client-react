import { StyledFormButtonWrapper, StyledFormTitle } from 'features/agency-dashboard/components/styled';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { CreateUserForm } from '../components/CreateUserForm';

export const CreateUserView: FC = () => {

  const handleFormCancel = () => {

  };

  const hanldeFormSubmit = async (data:)
  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormButtonWrapper>
        <StyledFormTitle>
          Create Agency
          <CreateUserForm onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
        </StyledFormTitle>
      </StyledFormButtonWrapper>
    </Container>
  );
};
