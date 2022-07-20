import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useDeleteUserMutation, useForgotPasswordMutation, useResendActivationEmailMutation } from 'common/api/userApi';
import { Image, RoleType, Role, User } from 'common/models';
import * as notificationService from 'common/services/notification';
import { ActionButton, ActionButtonProps, TableActions } from 'common/styles/button';
import { SubtleBadge } from 'common/styles/utilities';
import { useConfirmationModal } from 'features/confirmation-modal';
import { UserProfilePicture } from 'features/navbar/components/UserProfilePicture';
import { useRbac } from 'features/rbac';
import { useCallback, useMemo } from 'react';
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
  const [resendActivationEmail] = useResendActivationEmailMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [sendForgotPasswordEmail] = useForgotPasswordMutation();
  const { openModal } = useConfirmationModal();
  const { userHasPermission } = useRbac();

  const getUsersFullName = (user: User) => `${user.firstName} ${user.lastName}`;

  const handleResendActivationEmail = useCallback(
    (user: User) => {
      const message = `Resend Activation Email to ${getUsersFullName(user)}?`;

      const onConfirm = async () => {
        await resendActivationEmail({ email: user.email });
        notificationService.showSuccessMessage('Activation email has been sent.');
      };

      openModal({ message, confirmButtonLabel: 'SEND', onConfirm });
    },
    [openModal, resendActivationEmail],
  );

  const handleDelete = useCallback(
    (user: User) => {
      const message = `Delete ${getUsersFullName(user)}?`;

      const onConfirm = async () => {
        await deleteUser(user.id);
        notificationService.showSuccessMessage('User deleted.');
      };

      openModal({ message, confirmButtonLabel: 'DELETE', onConfirm });
    },
    [openModal, deleteUser],
  );

  const handlePasswordReset = useCallback(
    (user: User) => {
      const message = `Send Reset Password Email to ${getUsersFullName(user)}?`;

      const onConfirm = async () => {
        try {
          await sendForgotPasswordEmail({ email: user.email });
        } catch (e) {
          if (isFetchBaseQueryError(e)) {
            handleApiError(e);
          } else {
            throw e;
          }
        }
        notificationService.showSuccessMessage(`Password reset email has been sent to ${user.email}`);
      };

      openModal({ message, confirmButtonLabel: 'SEND', onConfirm });
    },
    [openModal, sendForgotPasswordEmail],
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
            <UserProfilePicture user={{ profilePicture: row.original.profilePicture } as User} size='xs' radius={32} />

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
                <Button onClick={e => e.stopPropagation()}>
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
                handleResendActivationEmail(user);
              },
              show: userHasPermission({ permission: 'user:resend-activation-email', data: user }),
            },
        actions: [
          {
            text: 'Reset Password',
            onClick: e => {
              e.stopPropagation();
              handlePasswordReset(user);
            },
            show: userHasPermission({ permission: 'user:send-reset-password-email', data: user }),
          },
          {
            text: 'Delete',
            onClick: e => {
              e.stopPropagation();
              handleDelete(user);
            },
            show: userHasPermission({ permission: 'user:delete', data: user }),
          },
        ],
      })),
    [users, userHasPermission, handleDelete, handlePasswordReset, handleResendActivationEmail],
  );

  return { columns, data };
};
