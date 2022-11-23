import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useDeleteUserMutation, useForgotPasswordMutation, useResendActivationEmailMutation } from 'common/api/userApi';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';
import { useModalWithData } from 'common/hooks/useModalWithData';
import { Image, Role, RoleType, User } from 'common/models';
import * as notificationService from 'common/services/notification';
import { ActionButton, ActionButtonProps, TableActions } from 'common/styles/button';
import { SubtleBadge } from 'common/styles/utilities';
import { UserProfilePicture } from 'features/navbar/components/UserProfilePicture';
import { useRbac } from 'features/rbac';
import { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { Column } from 'react-table';

export type UserTableItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  activatedAt: Date | ActionButtonProps;
  role: RoleType;
  profilePicture: Image | null;
  actions: ActionButtonProps[];
};

export type UseUserTableData = (agents?: User[]) => {
  columns: Column<UserTableItem>[];
  data: UserTableItem[];
};

export const useUserTableData: UseUserTableData = (users = []) => {
  const { userHasPermission } = useRbac();

  const [deleteUser] = useDeleteUserMutation();
  const [showDeleteModal, hideDeleteModal] = useModalWithData<User>(
    user =>
      ({ in: open, onExited }) => {
        const onConfirm = async () => {
          await deleteUser(user.id);
          notificationService.showSuccessMessage('User deleted.');
          hideDeleteModal();
        };

        return (
          <SimpleConfirmModal
            title='Delete User'
            show={open}
            onCancel={hideDeleteModal}
            onConfirm={onConfirm}
            confirmLabel='Delete'
            confirmIcon='trash-alt'
            confirmVariant='danger'
            onExited={onExited}
            body={
              <>
                <p className='m-0'>
                  Are you sure you want to delete this user?{' '}
                  <span className='text-danger'>
                    Note that this action <b>cannot</b> be undone.
                  </span>
                </p>

                <div className='mt-3 d-flex align-items-center'>
                  <UserProfilePicture user={user} size='xs' radius={32} />
                  <div>
                    {user.firstName} {user.lastName}
                    <div className='text-muted'>{user.email}</div>
                  </div>
                </div>
              </>
            }
          />
        );
      },
    [],
  );

  const [resendActivationEmail] = useResendActivationEmailMutation();
  const [showResendActivationModal, hideResendActivationModal] = useModalWithData<User>(
    user =>
      ({ in: open, onExited }) => {
        const onConfirm = async () => {
          await resendActivationEmail({ email: user.email });
          notificationService.showSuccessMessage('Activation email has been sent.');
          hideResendActivationModal();
        };

        return (
          <SimpleConfirmModal
            title='Resend Activation Email'
            show={open}
            onCancel={hideResendActivationModal}
            onConfirm={onConfirm}
            confirmLabel='Send Email'
            confirmIcon='envelope'
            onExited={onExited}
            body={
              <p className='m-0'>
                Would you like to resend an activation email to <b>{user.email}</b>?{' '}
              </p>
            }
          />
        );
      },
    [],
  );

  const [sendForgotPasswordEmail] = useForgotPasswordMutation();
  const [showForgotPasswordModal, hideForgotPasswordModal] = useModalWithData<User>(
    user =>
      ({ in: open, onExited }) => {
        const onConfirm = async () => {
          try {
            await sendForgotPasswordEmail({ email: user.email });
          } catch (e) {
            if (isFetchBaseQueryError(e)) {
              handleApiError(e);
            } else {
              throw e;
            }
          } finally {
            hideForgotPasswordModal();
          }
          notificationService.showSuccessMessage(`Password reset email has been sent to ${user.email}`);
        };

        return (
          <SimpleConfirmModal
            title='Send Reset Password Email'
            show={open}
            onCancel={hideForgotPasswordModal}
            onConfirm={onConfirm}
            confirmLabel='Send Email'
            confirmIcon='envelope'
            onExited={onExited}
            body={
              <p className='m-0'>
                Would you like to send a password reset email to <b>{user.email}</b>?{' '}
              </p>
            }
          />
        );
      },
    [],
  );

  const roleVariant = (role: RoleType) => {
    if (!role) return '';

    return {
      [Role.ADMIN]: 'danger',
      [Role.USER]: 'secondary',
      [Role.EDITOR]: 'info',
    }[role];
  };

  // Set up columns and headers
  const columns: Column<UserTableItem>[] = useMemo(
    () => [
      {
        accessor: 'lastName',
        Header: 'Name',
        Cell: ({ row }) => (
          <div className='d-flex d-row align-items-center mr-3'>
            <div className='me-2'>
              <UserProfilePicture
                user={{ profilePicture: row.original.profilePicture } as User}
                size='xs'
                radius={32}
              />
            </div>

            <div className='d-flex flex-column'>
              <span>
                {row.original.firstName}&nbsp;
                {row.original.lastName}
              </span>
              <small className='text-muted'>{row.original.email}</small>
            </div>
          </div>
        ),
      },
      {
        accessor: 'role',
        Header: 'Role',
        Cell: ({ value: role }) => (
          <SubtleBadge pill variant={roleVariant(role)}>
            {role}
          </SubtleBadge>
        ),
      },
      {
        accessor: 'activatedAt',
        Header: 'Activated',
        Cell: ({ value: activatedAt }) => (
          <>
            {activatedAt instanceof Date ? (
              <time dateTime={activatedAt.toISOString()}>
                {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(activatedAt)}
              </time>
            ) : (
              <>
                <ActionButton {...activatedAt}>{activatedAt.text}</ActionButton>
              </>
            )}
          </>
        ),
      },
      {
        accessor: 'actions',
        Header: '',
        Cell: ({ value: actions }) => (
          <>
            {actions.filter(action => action.show).length > 0 ? (
              <TableActions>
                <Button variant='link' onClick={e => e.stopPropagation()}>
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} size='xs' />
                </Button>
                <div>
                  {actions.map(action => (
                    <ActionButton key={action.text} {...action} />
                  ))}
                </div>
              </TableActions>
            ) : null}
          </>
        ),
        disableSortBy: true,
      },
    ],
    [],
  );

  // Transform User objects into the data format expected by the table.
  const data: UserTableItem[] = useMemo(
    () =>
      users.map(user => ({
        id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        activatedAt: user.activatedAt
          ? new Date(user.activatedAt)
          : {
              text: 'Resend Activation Email',
              onClick: e => {
                e.stopPropagation();
                showResendActivationModal(user);
              },
              show: userHasPermission({ permission: 'user:resend-activation-email', data: user }),
            },
        actions: [
          {
            text: 'Reset Password',
            onClick: e => {
              e.stopPropagation();
              showForgotPasswordModal(user);
            },
            show: userHasPermission({ permission: 'user:send-reset-password-email', data: user }),
          },
          {
            text: 'Delete',
            onClick: e => {
              e.stopPropagation();
              showDeleteModal(user);
            },
            show: userHasPermission({ permission: 'user:delete', data: user }),
          },
        ],
      })),
    [users, userHasPermission, showDeleteModal, showForgotPasswordModal, showResendActivationModal],
  );

  return { columns, data };
};
