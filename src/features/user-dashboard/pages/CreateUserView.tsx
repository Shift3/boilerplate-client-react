import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { useCreateUserMutation } from '..';
import { CreateUserForm, CreateUserFormData } from '../components/CreateUserForm';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';

export const CreateUserView: FC = () => {
  const history = useHistory();
  const [createUser] = useCreateUserMutation();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: CreateUserFormData) => {
    const { lastName } = data;
    try {
      await createUser({ lastName }).unwrap();
      showSuccessNotification('User created.');
      history.push('/users');
    } catch (error) {
      showErrorNotification('Unable to add user.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper>
        <StyledFormTitle>
          Create Agency
          <CreateUserForm onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
        </StyledFormTitle>
      </StyledFormWrapper>
    </Container>
  );
};
