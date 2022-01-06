import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useGetRolesQuery } from 'common/api/roleApi';
import { useCreateUserMutation } from 'common/api/userApi';
import { FormData, UserDetailForm } from '../components/UserDetailForm';
import { useRbac } from 'features/rbac';
import { useAuth } from 'features/auth/hooks';
import { useGetAgenciesQuery } from 'common/api/agencyApi';
import * as notificationService from 'common/services/notification';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { Breadcrumb } from 'react-bootstrap';

export const CreateUserView: FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { userHasPermission } = useRbac();
  const [createUser] = useCreateUserMutation();
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
  const { data: agencies = [], isLoading: isLoadingAgencies } = useGetAgenciesQuery(undefined, {
    skip: !userHasPermission('agency:read'),
  });

  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));

  const availableAgencies = userHasPermission('agency:read') ? agencies : [];

  // If the user doesn't have permission to see list of agencies,then they can
  // only create a new user within their own agency. Hence, the agency will be
  // passed in as a default value.
  const defaultValues: Partial<FormData> = {
    agency: !userHasPermission('agency:read') ? user?.agency : undefined,
  };

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createUser({ ...data, profilePicture: '' }).unwrap();
      notificationService.showSuccessMessage(
        `An email has been sent to ${data.email} with instructions to finish activating the account.`,
      );
      history.push('/users');
    } catch (error) {
      notificationService.showErrorMessage('Unable to add user.');
    }
  };

  const isLoading = isLoadingRoles || isLoadingAgencies;

  return (
    <PageWrapper>
      <Title>Create User</Title>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}} >
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/users'}} >
          User List
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Create User
        </Breadcrumb.Item>
      </Breadcrumb>
      {!isLoading && (
        <StyledFormWrapper>
          <UserDetailForm
            availableRoles={availableRoles}
            availableAgencies={availableAgencies}
            defaultValues={defaultValues}
            onCancel={handleFormCancel}
            onSubmit={handleFormSubmit}
          />
        </StyledFormWrapper>
      )}
    </PageWrapper>
  );
};
