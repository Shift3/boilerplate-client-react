import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAgenciesQuery } from 'common/api/agencyApi';
import { useGetRolesQuery } from 'common/api/roleApi';
import { useCreateUserMutation } from 'common/api/userApi';
import { FormCard, PageCrumb, PageHeader, SmallContainer } from 'common/components/Common';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { usePSFQuery } from 'common/hooks';
import { Agency, PaginatedResult } from 'common/models';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { useAuth } from 'features/auth/hooks';
import { useRbac } from 'features/rbac';
import { FC, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';

export const CreateUserView: FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { userHasPermission } = useRbac();
  const [createUser] = useCreateUserMutation();
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
      if (hasAgencyData) {
        setAvailableAgencies(prev => [...prev, ...agencyData!.results]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, hasAgencyData],
  );

  // If the user doesn't have permission to see list of agencies,then they can
  // only create a new user within their own agency. Hence, the agency will be
  // passed in as a default value.
  const defaultValues: Partial<FormData> = {
    agency: !userHasPermission('agency:read') ? user?.agency : undefined,
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
            <h1>Create User</h1>
            <p className='text-muted'>Add a new user to the system.</p>
          </div>
        </PageHeader>

        <FormCard>
          <FormCard.Body>
            <WithLoadingOverlay isLoading={isLoadingRoles || isLoadingAgencies}>
              <StyledFormWrapper>
                <UserDetailForm
                  availableRoles={availableRoles}
                  availableAgencies={availableAgencies}
                  defaultValues={defaultValues}
                  submitButtonLabel='Create'
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
