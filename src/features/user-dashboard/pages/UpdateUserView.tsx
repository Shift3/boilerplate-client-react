import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
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
  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(id);
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();

  useEffect(() => {
    if (!isLoadingUser && !user) {
      showErrorNotification('Unable to load user. Returning to user list.');
      history.replace('/users');
    }
  }, [id, isLoadingUser, user, history, showErrorNotification]);

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

  return (
    <Container className='d-flex justify-content-center'>
      {/* TODO: add loading spinner */}
      {!isLoadingUser && !isLoadingRoles && (
        <StyledFormWrapper>
          <StyledFormTitle>Update User</StyledFormTitle>
          <UserDetailForm
            availableRoles={roles}
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
