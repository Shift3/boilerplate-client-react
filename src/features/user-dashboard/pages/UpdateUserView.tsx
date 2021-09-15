import { FC, useLayoutEffect } from 'react';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { useHistory, useParams } from 'react-router-dom';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';
import { Container } from 'react-bootstrap';
import { useGetUsersQuery, useUpdateUserMutation } from '../userApi';
import { UpdateUserForm, UpdateUserFormData } from '../components/UpdateUserForm';

export interface RouteParams {
  id: string;
}

export const UpdateUserView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const [updateUser] = useUpdateUserMutation();

  const { user } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data: users }) => ({
      user: users?.find((user) => user.id === Number(id)),
    }),
  });

  useLayoutEffect(() => {
    if (Number.isNaN(Number(id)) || !user) {
      showErrorNotification('Unable to load user. Returning to user list.');
      history.replace('/users');
    }
  }, [id, history, user, showErrorNotification]);

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: UpdateUserFormData) => {
    const { firstName, lastName, email, profilePicture, roleName, agencyName } = data;
    try {
      await updateUser({ id: Number(id), firstName, lastName, email, profilePicture, roleName, agencyName }).unwrap();
      showSuccessNotification('User update.');
      history.push('/users');
    } catch (error) {
      showErrorNotification('Unable to update user.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper>
        <StyledFormTitle>Update User</StyledFormTitle>
        <UpdateUserForm
          defaultValues={{
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
            email: user?.email ?? '',
            profilePicture: user?.profilePicture ?? '',
            roleName: user?.roleName ?? '',
            agencyName: user?.agencyName ?? '',
          }}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </StyledFormWrapper>
    </Container>
  );
};
