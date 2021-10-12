import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { useGetAgenciesQuery } from 'features/agency-dashboard';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { useGetRolesQuery } from '../roleApi';
import { useCreateUserMutation } from '../userApi';
import { FormData, UserDetailForm } from '../components/UserDetailForm';
import styled from 'styled-components';

const StyledFormWrapper = styled.div`
  max-width: 500px;
  min-width: 500px;
  padding: 50px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  & label {
    color: white;
  }
  & .invalid-feedback {
    /* Modify style of validation error messages here */
  }
`;

const StyledFormTitle = styled.p`
  color: ${(props) => props.theme.cardHeader};
  font-size: 2em;
  font-weight: 500;
`;

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
      await createUser({ ...data, profilePicture: '' }).unwrap();
      showSuccessNotification('User created.');
      history.push('/users');
    } catch (error) {
      showErrorNotification('Unable to add user.');
    }
  };

  const isLoading = isLoadingRoles || isLoadingAgencies;

  return (
    <Container className='d-flex justify-content-center'>
      {/* TODO: add loading spinner */}
      {!isLoading && (
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
