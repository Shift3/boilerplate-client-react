import { FC } from 'react';
import Container from 'react-bootstrap/Container';

export const CreateUserView: FC = () => {
  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper>
        <StyledFormTitle>
          Create User
          <CreateUserForm />
        </StyledFormTitle>
      </StyledFormWrapper>
    </Container>
  );
};
