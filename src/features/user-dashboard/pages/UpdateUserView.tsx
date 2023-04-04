import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isFetchBaseQueryError } from 'common/api/handleApiError';
import { useGetUserByIdQuery, useGetUserHistoryQuery, useUpdateUserMutation } from 'common/api/userApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { isObject } from 'common/error/utilities';
import { PaginatedResult, Role, ServerValidationErrors, User } from 'common/models';
import * as notificationService from 'common/services/notification';
import { Card, Modal } from 'react-bootstrap';
import { PageCrumb, PageHeader, SmallContainer } from 'common/styles/page';
import { useRbac } from 'features/rbac';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';
import { Trans } from 'react-i18next';
import { ChangeLog } from 'common/components/ChangeLog/ChangeLog';
import { useAuth } from 'features/auth/hooks';
import { LoadingButton } from 'common/components/LoadingButton';
import { useInfiniteLoading } from 'common/hooks/useInfiniteLoading';
import { HistoricalRecord } from 'common/models/historicalRecord';
import { QueryParamsBuilder } from 'common/api/queryParamsBuilder';
import { ChangeListGroup } from 'common/components/ChangeLog/ChangeListGroup';
import { useModal } from 'react-modal-hook';
import { DimmableContent } from 'common/styles/utilities';

type RouteParams = {
  id: string;
};

export const UpdateUserView: FC = () => {
  const { id = '' } = useParams<RouteParams>();
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();
  const { userHasPermission } = useRbac();
  const [updateUser] = useUpdateUserMutation();
  const { data: user, isLoading: isLoadingUser, isFetching, error: getUserError } = useGetUserByIdQuery(id);

  const pageSize = 5;
  const queryParams = new QueryParamsBuilder().setPaginationParams(1, pageSize).build();
  const url = `/users/${id}/history/?${queryParams}`;
  const {
    loadedData: userHistory,
    error: userHistoryError,
    isFetching: isFetchingHistory,
    totalCount,
    hasMore,
    fetchMore,
  } = useInfiniteLoading<HistoricalRecord<User>, PaginatedResult<HistoricalRecord<User>>>(url, useGetUserHistoryQuery, {
    skip: loggedInUser?.role !== 'ADMIN',
  });

  const roles = Object.values(Role);

  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));
  const [formValidationErrors, setFormValidationErrors] = useState<ServerValidationErrors<FormData> | null>(null);

  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => {
      return (
        <Modal show={open} onHide={hideModal} onExited={onExited} centered contentClassName='changelog-modal-content'>
          <Modal.Header closeButton>
            <Modal.Title>Changes</Modal.Title>
          </Modal.Header>
          <Modal.Body className='changelog-modal-body'>
            <DimmableContent dim={isFetchingHistory}>
              <ChangeListGroup changeList={userHistory} />
            </DimmableContent>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-center changelog-modal-footer'>
            {hasMore && (
              <LoadingButton
                className='action-shadow'
                loading={isFetchingHistory}
                variant='primary'
                onClick={() => fetchMore()}
              >
                Load More
              </LoadingButton>
            )}
          </Modal.Footer>
        </Modal>
      );
    },
    [userHistory, isFetchingHistory],
  );

  useEffect(() => {
    if (getUserError) {
      notificationService.showErrorMessage('Unable to load user. Returning to user list.');
      navigate('/users', { replace: true });
    }
    if (userHistoryError) {
      notificationService.showErrorMessage("Unable to load the user's change history.");
    }
  }, [getUserError, navigate, userHistoryError]);

  const handleShowAllChanges = () => {
    showModal();
  };

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
          <WithLoadingOverlay isLoading={isLoadingUser} isInitialLoad={isLoadingUser && isFetching}>
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
      <div className='mt-3'>
        {userHistory && totalCount ? (
          <ChangeLog
            changeList={userHistory}
            previewSize={pageSize}
            totalChanges={totalCount}
            handleShowAllChanges={handleShowAllChanges}
          />
        ) : null}
      </div>
    </SmallContainer>
  );
};
