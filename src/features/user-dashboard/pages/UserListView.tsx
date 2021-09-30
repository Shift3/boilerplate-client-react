import { CustomRenderer, GenericTable, TableHeader } from 'common/components';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { useConfirmationModal } from 'common/hooks';
import { User } from 'common/models';
import {
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useGetUsersQuery,
  useResendActivationEmailMutation,
} from 'features/user-dashboard/userApi';
import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';

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
  const { data: users = [], isLoading: isLoadingUsers } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resendActivationEmail] = useResendActivationEmailMutation();
  const { Modal: ConfirmationModal, openModal, closeModal } = useConfirmationModal();
  const { showSuccessNotification } = useShowNotification();

  const getUsersFullName = (user: User) => `${user.firstName} ${user.lastName}`;

  const handleResendActivationEmail = (user: User) => {
    const message = `Resend Activation Email to ${getUsersFullName(user)}?`;

    const onConfirm = () => {
      resendActivationEmail({ id: user.id });
      closeModal();
      showSuccessNotification('Activation email has been sent.');
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

  const handleDelete = (user: User) => {
    const message = `Delete ${getUsersFullName(user)}?`;

    const onConfirm = () => {
      deleteUser(user.id);
      closeModal();
      showSuccessNotification('User deleted.');
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

  const handlePasswordReset = (user: User) => {
    const message = `Send Reset Password Email to ${getUsersFullName(user)}?`;

    const onConfirm = () => {
      forgotPassword({ email: user.email });
      closeModal();
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

  const navigateToUpdateView = (user: User) => {
    history.push(`/users/update-user/${user.id}`);
  };

  const headers: TableHeader<UserTableItem>[] = [
    { key: 'lastName', label: 'LAST NAME' },
    { key: 'firstName', label: 'FIRST NAME' },
    { key: 'email', label: 'EMAIL' },
    { key: 'role', label: 'ROLE' },
    { key: 'activatedAt', label: 'ACTIVATED' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const items: UserTableItem[] = users.map((user) => ({
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
        },
    actions: [
      { icon: 'edit', tooltipText: 'Edit', onClick: () => navigateToUpdateView(user) },
      {
        icon: 'trash-alt',
        tooltipText: 'Delete',

        onClick: () => handleDelete(user),
      },
      { icon: 'lock', tooltipText: 'Reset Password', onClick: () => handlePasswordReset(user) },
    ],
  }));

  const customRenderers: CustomRenderer<UserTableItem>[] = [
    {
      key: 'activatedAt',
      renderer: ({ activatedAt }) => (
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
      key: 'actions',
      renderer: ({ actions }: UserTableItem) => (
        <>
          {actions.map((action, index) => (
            <ActionButton key={index} icon={action.icon} tooltipText={action.tooltipText} onClick={action.onClick} />
          ))}
        </>
      ),
    },
  ];

  return (
    <Container>
      <div className='mb-4 text-end'>
        <Link to='/users/create-user'>
          <Button>ADD USER</Button>
        </Link>
      </div>
      <WithLoadingOverlay isLoading={isLoadingUsers}>
        <GenericTable<UserTableItem> headers={headers} items={items} customRenderers={customRenderers} />
      </WithLoadingOverlay>
      <ConfirmationModal />
    </Container>
  );
};
