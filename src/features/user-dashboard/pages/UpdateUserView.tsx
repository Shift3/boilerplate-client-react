import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { useGetAgenciesQuery } from 'features/agency-dashboard/agencyApi';
import { FC, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory, useParams } from 'react-router-dom';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';
import { FormData, UserDetailForm } from '../components/UserDetailForm';
import { useGetRolesQuery } from '../roleApi';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../userApi';

interface RouteParams {
  id: string;
}

export const UpdateUserView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const [updateUser] = useUpdateUserMutation();
  const { data: user, isLoading: isLoadingUser, error: getUserError } = useGetUserByIdQuery(id);
  const { data: roles = [], isLoading: isLoadingRoles, error: getRolesError } = useGetRolesQuery();
  const { data: agencies = [], isLoading: isLoadingAgencies, error: getAgenciesError } = useGetAgenciesQuery();

  useEffect(() => {
    if (getUserError || getRolesError || getAgenciesError) {
      showErrorNotification('Unable to load user. Returning to user list.');
      history.replace('/users');
    }
  }, [getUserError, getRolesError, getAgenciesError, history, showErrorNotification]);

  const handleFormCancel = () => history.goBack();

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateUser({ id: Number(id), ...data }).unwrap();
      history.push('/users');
      showSuccessNotification('User updated.');
    } catch (error) {
      showErrorNotification('Unable to update user');
    }
  };

  const isLoading = isLoadingUser || isLoadingRoles || isLoadingAgencies;

  return (
    <Container className='d-flex justify-content-center'>
      {/* TODO: add loading spinner */}
      {!isLoading && (
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
      )}
    </Container>
  );
};
