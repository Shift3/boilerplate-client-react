import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { useGetAgenciesQuery } from 'features/agency-dashboard';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { useGetRolesQuery } from '../roleApi';
import { useCreateUserMutation } from '../userApi';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';
import { CreateUserForm } from '../components';
import { CreateUserFormData } from '../components/CreateUserForm';

export const CreateUserView: FC = () => {
  const history = useHistory();
  const [createUser] = useCreateUserMutation();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const { data: roles = [] } = useGetRolesQuery();
  const { data: agencies = [] } = useGetAgenciesQuery();

  // TODO: filter out the roles and agencies that the current authenticated user is
  // allowed to access (need to implement role checks first)

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: CreateUserFormData) => {
    const { email, firstName, lastName, profilePicture = '', roleName, agencyName } = data;
    const role = roles.find((role) => role.roleName === roleName);
    const agency = agencies.find((agency) => agency.agencyName === agencyName);

    if (!role) {
      showErrorNotification('Role must be a valid role.');
      return;
    }

    if (!agency) {
      showErrorNotification('Agency must be a valid agency.');
      return;
    }

    try {
      await createUser({ email, firstName, lastName, profilePicture, role, agency }).unwrap();
      showSuccessNotification('User created.');
      history.push('/users');
    } catch (error) {
      showErrorNotification('Unable to add user.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper>
        <StyledFormTitle>Create User </StyledFormTitle>
        <CreateUserForm roles={roles} agencies={agencies} onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </Container>
  );
};
