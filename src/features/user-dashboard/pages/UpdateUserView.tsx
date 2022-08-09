import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'common/api/userApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { isObject } from 'common/error/utilities';
import { Role, ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { Card } from 'react-bootstrap';
import { PageCrumb, PageHeader, SmallContainer } from 'common/styles/page';
import { useRbac } from 'features/rbac';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';
import { Trans } from 'react-i18next';

type RouteParams = {
  id: string;
};

export const UpdateUserView: FC = () => {
  const { id = '' } = useParams<RouteParams>();
  const navigate = useNavigate();
  const { userHasPermission } = useRbac();
  const [updateUser] = useUpdateUserMutation();
  const { data: user, isLoading: isLoadingUser, isFetching, error: getUserError } = useGetUserByIdQuery(id);
  const roles = Object.values(Role);

  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  useEffect(() => {
    if (getUserError) {
      notificationService.showErrorMessage('Unable to load user. Returning to user list.');
      navigate('/users', { replace: true });
    }
  }, [getUserError, navigate]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateUser({
        id,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        email: data.email,
      }).unwrap();
      navigate('/users');
      notificationService.showSuccessMessage('User updated.');
    } catch (error) {
      notificationService.showErrorMessage('Unable to update user.');
      if (error && isFetchBaseQueryError(error)) {
        if (isObject(error.data)) {
          setFormValidationErrors(error.data);
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
          <>
            <FontAwesomeIcon icon={['fas', 'chevron-left']} />
            <Trans i18nKey='createUser.back'>Back to User List</Trans>
          </>
        </Link>
      </PageCrumb>

      <PageHeader>
        <div>
          <h1>
            <Trans i18nKey='updateUser.heading'>Update User</Trans>
          </h1>
          <p className='text-muted'>
            <Trans i18nKey='updateUser.subheading'>Update this users details and roles here.</Trans>
          </p>
        </div>
      </PageHeader>

      <Card>
        <Card.Body>
          <WithLoadingOverlay
            isLoading={isLoadingUser}
            isInitialLoad={isLoadingUser && isFetching}
            containerHasRoundedCorners
            containerBorderRadius='6px'
          >
            {!isLoadingUser ? (
              <UserDetailForm
                availableRoles={availableRoles}
                defaultValues={user}
                submitButtonLabel='Save'
                onSubmit={handleFormSubmit}
                serverValidationErrors={formValidationErrors}
              />
            ) : null}
          </WithLoadingOverlay>
        </Card.Body>
      </Card>
    </SmallContainer>
  );
};
