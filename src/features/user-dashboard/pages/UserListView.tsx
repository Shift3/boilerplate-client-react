import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { User } from 'common/models';
import {
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useGetUsersQuery,
  useResendActivationEmailMutation,
} from 'common/api/userApi';
import { FC, useCallback, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { HasPermission, useRbac } from 'features/rbac';
import * as notificationService from 'common/services/notification';
import { CreateButton } from 'common/styles/button';
import { useConfirmationModal } from 'features/confirmation-modal';
import { usePagination } from 'common/api/pagination';
import { DataTable } from 'common/components/DataTable';
import { Column } from 'react-table';

type UserTableItem = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  activatedAt: Date | ActionButtonProps;
  role: string;
  actions: ActionButtonProps[];
};

export const UserListView: FC = () => {
  const history = useHistory();
  const { userHasPermission } = useRbac();
  const { page, pageSize } = usePagination();
  const { data, isLoading, isFetching } = useGetUsersQuery({ page, pageSize });
  const [deleteUser] = useDeleteUserMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resendActivationEmail] = useResendActivationEmailMutation();
  const { openModal } = useConfirmationModal();
  const users = useMemo(() => data?.results ?? [], [data]);
  const isPageLoading = isLoading || isFetching;

  const getUsersFullName = (user: User) => `${user.firstName} ${user.lastName}`;

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
        await forgotPassword({ email: user.email });
        notificationService.showSuccessMessage(`Password reset email has been sent to ${user.email}`);
      };

      openModal({ message, confirmButtonLabel: 'SEND', onConfirm });
    },
    [openModal, forgotPassword],
  );

  const navigateToUpdateView = useCallback(
    (user: User) => {
      history.push(`/users/update-user/${user.id}`);
    },
    [history],
  );

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
        Cell: ({ value, row }) => value.map(props => <ActionButton key={`${row.id}-${props.icon}`} {...props} />),
      },
    ],
    [],
  );

  const items: UserTableItem[] = useMemo(
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

  return (
    <Container>
      <HasPermission perform='user:create'>
        <div className='mb-4 text-end'>
          <Link to='/users/create-user'>
            <CreateButton>ADD USER</CreateButton>
          </Link>
        </div>
      </HasPermission>
      <WithLoadingOverlay isLoading={isPageLoading}>
        <DataTable<UserTableItem> columns={columns} data={items} />
      </WithLoadingOverlay>
    </Container>
  );
};
