import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAgenciesQuery } from 'common/api/agencyApi';
import { useGetRolesQuery } from 'common/api/roleApi';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'common/api/userApi';
import { FormCard, PageCrumb, PageHeader, SmallContainer } from 'common/components/Common';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { usePSFQuery } from 'common/hooks';
import { Agency, PaginatedResult } from 'common/models';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { useRbac } from 'features/rbac';
import { FC, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';

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
  const hasAgencyData = !!agencyData?.results && !!agencyData.results.length;
  useEffect(
    () => {
      if (agencyData?.results && agencyData.results.length) {
        setAvailableAgencies(prev => [...prev, ...agencyData!.results]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, hasAgencyData],
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
    <HolyGrailLayout>
      <SmallContainer>
        <PageCrumb>
          <Link to='/users'>
            <FontAwesomeIcon icon={['fas', 'chevron-left']} /> Back to User List
          </Link>
        </PageCrumb>

        <PageHeader>
          <div>
            <h1>Update User</h1>
            <p className='text-muted'>Update this users details and roles here.</p>
          </div>
        </PageHeader>

        <FormCard>
          <FormCard.Body>
            <WithLoadingOverlay isLoading={isLoadingUser || isLoadingRoles || isLoadingAgencies}>
              <StyledFormWrapper>
                <UserDetailForm
                  availableRoles={availableRoles}
                  availableAgencies={availableAgencies}
                  defaultValues={user}
                  submitButtonLabel='Save'
                  onSubmit={handleFormSubmit}
                  onAgencySelectScrollToBottom={getNextPage}
                />
              </StyledFormWrapper>
            </WithLoadingOverlay>
          </FormCard.Body>
        </FormCard>
      </SmallContainer>
    </HolyGrailLayout>
  );
};
