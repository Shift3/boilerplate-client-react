import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { useGetAgenciesQuery } from 'features/agency-dashboard';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { useGetRolesQuery } from '../roleApi';
import { useCreateUserMutation } from '../userApi';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';
import { FormData, UserDetailForm } from '../components/UserDetailForm';

export const CreateUserView: FC = () => {
  const history = useHistory();
  const [createUser] = useCreateUserMutation();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
  const { data: agencies = [], isLoading: isLoadingAgencies } = useGetAgenciesQuery();

  // TODO: filter out the roles and agencies that the current authenticated user is
  // allowed to access (need to implement role checks first)

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createUser(data).unwrap();
      showSuccessNotification('User created.');
      history.push('/users');
    } catch (error) {
      showErrorNotification('Unable to add user.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      {!isLoadingRoles && !isLoadingAgencies && (
        <StyledFormWrapper>
          <StyledFormTitle>Create User</StyledFormTitle>
          <UserDetailForm
            availableRoles={roles}
            availableAgencies={agencies}
            onCancel={handleFormCancel}
            onSubmit={handleFormSubmit}
          />
        </StyledFormWrapper>
      )}
    </Container>
  );
};
