import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'common/api/userApi';
import { FormCard, PageCrumb, PageHeader, SmallContainer } from 'common/components/Common';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { isErrorResponse, isFetchBaseQueryError } from 'common/error/utilities';
import { Role, ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { useRbac } from 'features/rbac';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';

type RouteParams = {
  id: string;
};

export const UpdateUserView: FC = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const { userHasPermission } = useRbac();
  const [updateUser] = useUpdateUserMutation();
  const { data: user, isLoading: isLoadingUser, error: getUserError } = useGetUserByIdQuery(Number(id));
  const roles = Object.values(Role);

  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));
  const [submissionError, setSubmissionError] = useState<ServerValidationErrors<FormData> | null>(null);

  useEffect(() => {
    if (getUserError) {
      notificationService.showErrorMessage('Unable to load user. Returning to user list.');
      navigate('/users', { replace: true });
    }
  }, [getUserError, navigate]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateUser({ id: Number(id), ...data }).unwrap();
      navigate('/users');
      notificationService.showSuccessMessage('User updated.');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (isErrorResponse<FormData>(error?.data)) {
          setSubmissionError((error?.data).error);
        }
      }
      notificationService.showErrorMessage('Unable to update user');
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
          <h1>Update User</h1>
          <p className='text-muted'>Update this users details and roles here.</p>
        </div>
      </PageHeader>

      <FormCard>
        <FormCard.Body>
          <WithLoadingOverlay isLoading={isLoadingUser} containerHasRoundedCorners containerBorderRadius='6px'>
            <StyledFormWrapper>
              <UserDetailForm
                availableRoles={availableRoles}
                defaultValues={user}
                submitButtonLabel='Save'
                onSubmit={handleFormSubmit}
                serverValidationErrors={submissionError}
              />
            </StyledFormWrapper>
          </WithLoadingOverlay>
        </FormCard.Body>
      </FormCard>
    </SmallContainer>
  );
};
