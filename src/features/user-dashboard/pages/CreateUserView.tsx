import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useGetRolesQuery } from 'common/api/roleApi';
import { useCreateUserMutation } from 'common/api/userApi';
import { PageWrapper, Title, StyledFormWrapper } from 'features/styles/PageStyles';
import { FormData, UserDetailForm } from '../components/UserDetailForm';
import { useRbac } from 'features/rbac';
import { useAuth } from 'features/auth/hooks';
import { useGetAgenciesQuery } from 'common/api/agencyApi';

export const CreateUserView: FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { userHasPermission } = useRbac();
  const [createUser] = useCreateUserMutation();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
  const { data: agencies = [], isLoading: isLoadingAgencies } = useGetAgenciesQuery(undefined, {
    skip: !userHasPermission('agency:read'),
  });

  const availableRoles = roles.filter((role) => userHasPermission({ permission: 'role:read', data: role }));
  const availableAgencies = agencies.length !== 0 ? agencies : [user!.agency];

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
    <PageWrapper>
      {!isLoading && (
        <StyledFormWrapper>
          <Title>Create User</Title>
          <UserDetailForm
            availableRoles={availableRoles}
            availableAgencies={availableAgencies}
            onCancel={handleFormCancel}
            onSubmit={handleFormSubmit}
          />
        </StyledFormWrapper>
      )}
    </PageWrapper>
  );
};
