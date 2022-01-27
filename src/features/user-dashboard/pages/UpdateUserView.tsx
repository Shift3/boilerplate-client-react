import { useGetAgenciesQuery } from 'common/api/agencyApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { useRbac } from 'features/rbac';
import { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';
import { useGetRolesQuery } from 'common/api/roleApi';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'common/api/userApi';
import * as notificationService from 'common/services/notification';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { usePSFQuery } from 'common/hooks';
import { Agency, PaginatedResult } from 'common/models';

interface RouteParams {
  id: string;
}

export const UpdateUserView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { userHasPermission } = useRbac();
  const [updateUser] = useUpdateUserMutation();
  const { data: user, isLoading: isLoadingUser, error: getUserError } = useGetUserByIdQuery(id);
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
  const {
    data: agencyData,
    isLoading: isLoadingAgencies,
    page,
    getNextPage,
  } = usePSFQuery<PaginatedResult<Agency>>(useGetAgenciesQuery, { skip: !userHasPermission('agency:read') });
  const [availableAgencies, setAvailableAgencies] = useState<Agency[]>([]);
  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));

  // Append agencies to list of available agencies when the select input scrolls to the bottom
  // and a new page of results is received. Note that this works because the page number only
  // increases here since we only update it when a user scrolls to the bottom of a select and
  // requests the next page. If page numbers could decrease as well, extra logic would be needed
  // here to ensure that we don't re-append data from pages that have already been appeneded.
  useEffect(
    () => {
      if (agencyData?.results && agencyData.results.length) {
        setAvailableAgencies(prev => [...prev, ...agencyData!.results]);
      }
    },
    // isLoadingAgencies indicates that the query is currently loading for the first time, and has no data yet.
    // It is needed as a dependency here because the page number does not change when the query is first called.
    [page, isLoadingAgencies],
  );

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
            onAgencySelectScrollToBottom={getNextPage}
          />
        </StyledFormWrapper>
      </WithLoadingOverlay>
    </PageWrapper>
  );
};
