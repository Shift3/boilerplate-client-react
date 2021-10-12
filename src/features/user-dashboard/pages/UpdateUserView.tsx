import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { useGetAgenciesQuery } from 'features/agency-dashboard/agencyApi';
import { FC, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory, useParams } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';
import { useGetRolesQuery } from '../roleApi';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../userApi';
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
interface RouteParams {
  id: string;
}

export const UpdateUserView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const [updateUser] = useUpdateUserMutation();
  const { data: user, isLoading: isLoadingUser, error: getUserError } = useGetUserByIdQuery(id);
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
  const { data: agencies = [], isLoading: isLoadingAgencies } = useGetAgenciesQuery();

  // TODO: filter out the roles and agencies that the current authenticated user is
  // allowed to access (need to implement role checks first)

  useEffect(() => {
    if (getUserError) {
      showErrorNotification('Unable to load user. Returning to user list.');
      history.replace('/users');
    }
  }, [getUserError, history, showErrorNotification]);

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateUser({ id: Number(id), ...data }).unwrap();
      history.push('/users');
      showSuccessNotification('User updated.');
    } catch (error) {
      showErrorNotification('Unable to update user');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      <WithLoadingOverlay isLoading={isLoadingUser || isLoadingRoles || isLoadingAgencies}>
        <StyledFormWrapper>
          <StyledFormTitle>Update User</StyledFormTitle>
          <UserDetailForm
            availableRoles={roles}
            availableAgencies={agencies}
            defaultValues={user}
            submitButtonLabel='UPDATE'
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </StyledFormWrapper>
      </WithLoadingOverlay>
    </Container>
  );
};
