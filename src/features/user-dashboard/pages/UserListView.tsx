/* eslint-disable no-console */
import { CustomRenderer, GenericTable, TableHeader } from 'common/components';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { useConfirmationModal } from 'common/hooks';
import { User } from 'common/models';
import { useDeleteUserMutation, useForgotPasswordMutation, useGetUsersQuery } from 'features/user-dashboard/userApi';
import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

type UserTableItem = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  activatedAt: string | null;
  role: string;
  actions: ActionButtonProps[];
};

export const UserListView: FC = () => {
  const { data: users = [] } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const { Modal: ConfirmationModal, openModal, closeModal } = useConfirmationModal();

  const handleDelete = (user: User) => {
    const message = `Delete ${user.firstName} + ${user.lastName}?`;

    const onConfirm = () => {
      deleteUser(user.id);
      closeModal();
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

  const handlePasswordReset = (user: User) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const message = `Send Reset Password Email to ${fullName}?`;

    const onConfirm = () => {
      forgotPassword({ email: user.email });
      closeModal();
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
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
    activatedAt: user.activatedAt,
    actions: [
      { icon: 'edit', tooltipText: 'Edit', onClick: () => console.log(`Edit ${user.id}`) },
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
      key: 'actions',
      renderer: ({ actions }: UserTableItem) => (
        <>
          {actions.map((action, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ActionButton key={index} icon={action.icon} tooltipText={action.tooltipText} onClick={action.onClick} />
          ))}
        </>
      ),
    },
  ];

  return (
    <Container>
      <div className='mb-4 text-right'>
        <Link to='/users/create-user'>
          <Button>ADD USER</Button>
        </Link>
      </div>
      <GenericTable<UserTableItem> headers={headers} items={items} customRenderers={customRenderers} />
      <ConfirmationModal />
    </Container>
  );
};
