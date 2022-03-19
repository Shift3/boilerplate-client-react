import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { useInviteUserMutation } from 'common/api/userApi';
import { isObject } from 'common/error/utilities';
import { Role, ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { FormCard, StyledFormWrapper } from 'common/styles/form';
import { PageCrumb, PageHeader, SmallContainer } from 'common/styles/page';
import { useRbac } from 'features/rbac';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';

export const CreateUserView: FC = () => {
  const navigate = useNavigate();
  const { userHasPermission } = useRbac();
  const [inviteUser] = useInviteUserMutation();
  const roles = Object.values(Role);
  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));
  const defaultValues: Partial<FormData> = {};
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await inviteUser({ ...data }).unwrap();
      notificationService.showSuccessMessage(
        `An email has been sent to ${data.email} with instructions to finish activating the account.`,
      );
      navigate('/users');
    } catch (error) {
      notificationService.showErrorMessage('Unable to add user.');
      if (isFetchBaseQueryError(error)) {
        if (isObject(error?.data)) {
          setFormValidationErrors(error?.data);
        }
      } else {
        throw error;
      }
    }
  };

  return (
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
          <StyledFormWrapper>
            <UserDetailForm
              availableRoles={availableRoles}
              defaultValues={defaultValues}
              submitButtonLabel='Create'
              onSubmit={handleFormSubmit}
              serverValidationErrors={formValidationErrors}
            />
          </StyledFormWrapper>
        </FormCard.Body>
      </FormCard>
    </SmallContainer>
  );
};
