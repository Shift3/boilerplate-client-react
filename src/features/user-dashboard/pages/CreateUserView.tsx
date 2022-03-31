import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCreateUserMutation } from 'common/api/userApi';
import { FormCard, PageCrumb, PageHeader, SmallContainer } from 'common/components/Common';
import { isErrorResponse, isFetchBaseQueryError } from 'common/error/utilities';
import { Role, ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { useRbac } from 'features/rbac';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';

export const CreateUserView: FC = () => {
  const navigate = useNavigate();
  const { userHasPermission } = useRbac();
  const [createUser] = useCreateUserMutation();
  const roles = Object.values(Role);
  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));
  const defaultValues: Partial<FormData> = {};
  const [submissionError, setSubmissionError] = useState<ServerValidationErrors<FormData> | null>(null);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createUser({ ...data, profilePicture: null }).unwrap();
      notificationService.showSuccessMessage(
        `An email has been sent to ${data.email} with instructions to finish activating the account.`,
      );
      navigate('/users');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (isErrorResponse<FormData>(error?.data)) {
          setSubmissionError((error?.data).error);
        }
      }
      notificationService.showErrorMessage('Unable to add user.');
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
              submissionError={submissionError}
            />
          </StyledFormWrapper>
        </FormCard.Body>
      </FormCard>
    </SmallContainer>
  );
};
