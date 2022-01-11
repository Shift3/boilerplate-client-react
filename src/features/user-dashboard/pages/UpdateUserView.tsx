import { useGetAgenciesQuery } from 'common/api/agencyApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { useAuth } from 'features/auth/hooks';
import { useRbac } from 'features/rbac';
import { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';
import { useGetRolesQuery } from 'common/api/roleApi';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'common/api/userApi';
import * as notificationService from 'common/services/notification';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { usePageableQuery } from 'common/api/paginate';
import { Agency } from 'common/models';

interface RouteParams {
  id: string;
}

export const UpdateUserView: FC = () => {
  const { id } = useParams<RouteParams>();
  const auth = useAuth();
  const { userHasPermission } = useRbac();
  const history = useHistory();
  const [updateUser] = useUpdateUserMutation();
  const { data: user, isLoading: isLoadingUser, error: getUserError } = useGetUserByIdQuery(id);
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
  const { data: agencies = [], isLoading: isLoadingAgencies } = usePageableQuery<Agency, 'Agency'>(
    useGetAgenciesQuery,
    {},
    { skip: !userHasPermission('agency:read') },
  );

  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));
  const availableAgencies = agencies.length !== 0 ? agencies : [auth.user!.agency];

  useEffect(() => {
    if (getUserError) {
      notificationService.showErrorMessage('Unable to load user. Returning to user list.');
      history.replace('/users');
    }
  }, [getUserError, history]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateUser({ id: Number(id), ...data }).unwrap();
      history.push('/users');
      notificationService.showSuccessMessage('User updated.');
    } catch (error) {
      notificationService.showErrorMessage('Unable to update user');
    }
  };

  return (
    <PageWrapper>
      <WithLoadingOverlay isLoading={isLoadingUser || isLoadingRoles || isLoadingAgencies}>
        <StyledFormWrapper>
          <Title>Update User</Title>
          <UserDetailForm
            availableRoles={availableRoles}
            availableAgencies={availableAgencies}
            defaultValues={user}
            submitButtonLabel='UPDATE'
            onSubmit={handleFormSubmit}
          />
        </StyledFormWrapper>
      </WithLoadingOverlay>
    </PageWrapper>
  );
};
