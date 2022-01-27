import { useDeleteUserMutation, useForgotPasswordMutation, useResendActivationEmailMutation } from 'common/api/userApi';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { User } from 'common/models';
import { useConfirmationModal } from 'features/confirmation-modal';
import { useRbac } from 'features/rbac';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Column } from 'react-table';
import * as notificationService from 'common/services/notification';

export type UserTableItem = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  activatedAt: Date | ActionButtonProps;
  role: string;
  actions: ActionButtonProps[];
};

export type UseUserTableData = (agents?: User[]) => {
  columns: Column<UserTableItem>[];
  data: UserTableItem[];
};

export const useUserTableData: UseUserTableData = (users = []) => {
  const history = useHistory();
  const [resendActivationEmail] = useResendActivationEmailMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [sendForgotPasswordEmail] = useForgotPasswordMutation();
  const { openModal } = useConfirmationModal();
  const { userHasPermission } = useRbac();

  const getUsersFullName = (user: User) => `${user.firstName} ${user.lastName}`;

  const navigateToUpdateView = useCallback(
    (user: User) => {
      history.push(`/users/update-user/${user.id}`);
    },
    [history],
  );

  const handleResendActivationEmail = useCallback(
    (user: User) => {
      const message = `Resend Activation Email to ${getUsersFullName(user)}?`;

      const onConfirm = async () => {
        await resendActivationEmail({ id: user.id });
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
        await sendForgotPasswordEmail({ email: user.email });
        notificationService.showSuccessMessage(`Password reset email has been sent to ${user.email}`);
      };

      openModal({ message, confirmButtonLabel: 'SEND', onConfirm });
    },
    [openModal, sendForgotPasswordEmail],
  );

  // Set up columns and headers
  const columns: Column<UserTableItem>[] = useMemo(
    () => [
      { accessor: 'lastName', Header: 'Last Name' },
      { accessor: 'firstName', Header: 'First Name' },
      { accessor: 'email', Header: 'Email' },
      { accessor: 'role', Header: 'Role' },
      {
        accessor: 'activatedAt',
        Header: 'Activated',
        Cell: ({ value: activatedAt }) => (
          <>
            {activatedAt instanceof Date ? (
              new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(activatedAt)
            ) : (
              <ActionButton {...activatedAt} />
            )}
          </>
        ),
      },
      {
        accessor: 'actions',
        Header: 'Actions',
        Cell: ({ value: actions, row }) =>
          actions.map(action => <ActionButton key={`${action.icon}-${row.id}`} {...action} />),
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
        role: user.role.roleName,
        activatedAt: user.activatedAt
          ? new Date(user.activatedAt)
          : {
              icon: 'envelope',
              tooltipText: 'Resend Activation Email',
              onClick: () => handleResendActivationEmail(user),
              show: userHasPermission({ permission: 'user:resend-activation-email', data: user }),
            },
        actions: [
          {
            icon: 'edit',
            tooltipText: 'Edit',
            onClick: () => navigateToUpdateView(user),
            show: userHasPermission({ permission: 'user:update', data: user }),
          },
          {
            icon: 'trash-alt',
            tooltipText: 'Delete',
            onClick: () => handleDelete(user),
            show: userHasPermission({ permission: 'user:delete', data: user }),
          },
          {
            icon: 'lock',
            tooltipText: 'Reset Password',
            onClick: () => handlePasswordReset(user),
            show: userHasPermission({ permission: 'user:send-reset-password-email', data: user }),
          },
        ],
      })),
    [users, userHasPermission, handleDelete, handlePasswordReset, handleResendActivationEmail, navigateToUpdateView],
  );

  return { columns, data };
};
