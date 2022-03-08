import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetRolesQuery } from 'common/api/roleApi';
import { useCreateUserMutation } from 'common/api/userApi';
import { FormCard, PageCrumb, PageHeader, SmallContainer } from 'common/components/Common';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { useRbac } from 'features/rbac';
import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';

export const CreateUserView: FC = () => {
  const history = useHistory();
  const { userHasPermission } = useRbac();
  const [createUser] = useCreateUserMutation();
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));
  const defaultValues: Partial<FormData> = {};

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createUser({ ...data, profilePicture: null }).unwrap();
      notificationService.showSuccessMessage(
        `An email has been sent to ${data.email} with instructions to finish activating the account.`,
      );
      history.push('/users');
    } catch (error) {
      notificationService.showErrorMessage('Unable to add user.');
    }
  };

  return (
    <SmallContainer>
      <PageCrumb>
        <Link to='/users'>
          <FontAwesomeIcon icon={["fas", "chevron-left"]} />  Back to User List
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
            <WithLoadingOverlay isLoading={isLoadingRoles} containerHasRoundedCorners containerBorderRadius='6px'>
              <StyledFormWrapper>
                <UserDetailForm
                  availableRoles={availableRoles}
                  defaultValues={defaultValues}
                  submitButtonLabel='Create'
                  onSubmit={handleFormSubmit}
                />
              </StyledFormWrapper>
            </WithLoadingOverlay>
        </FormCard.Body>
      </FormCard>
    </SmallContainer>
  );
};
