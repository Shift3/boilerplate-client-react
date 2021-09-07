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
  // TODO:
  //  - fetch the available roles
  //  - fetch the available agencies
  //      const { data: agencies } = useGetAgenciesQuery();
  //  - filter out the roles and agencies that the current authenticated user is
  //      allowed to access

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: CreateUserFormData) => {
    const { email, firstName, lastName, profilePicture, role, agency } = data;

    // TODO:
    //  - convert 'role' from name to the actualy Role object
    //  - convert 'agency' from name to Agency object

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
          {/* TODO
                - pass available roles and agencies to be displayed in the form
           */}
          <CreateUserForm onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
        </StyledFormTitle>
      </StyledFormWrapper>
    </Container>
  );
};
