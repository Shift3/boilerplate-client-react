/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import GenericTable, { TableHeader } from 'common/components/GenericTable';
import { useGetUsersQuery } from 'features/admin/user/usersApi';
import { FC, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

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

  const headers: TableHeader<UserTableItem>[] = [
    { key: 'lastName', label: 'LAST NAME' },
    { key: 'firstName', label: 'FIRST NAME' },
    { key: 'email', label: 'EMAIL' },
    { key: 'role', label: 'ROLE' },
    { key: 'activatedAt', label: 'ACTIVATED' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const items: UserTableItem[] = useMemo(
    () =>
      users.map((user) => ({
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
            onClick: () => console.log(`Delete ${user.id}`),
          },
          { icon: 'lock', tooltipText: 'Reset Password', onClick: () => console.log(`Reset Password ${user.id}`) },
        ],
      })),
    [users],
  );

  const customRenderers = {
    actions: ({ actions }: UserTableItem) => (
      <>
        {actions.map((action, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ActionButton key={index} icon={action.icon} tooltipText={action.tooltipText} onClick={action.onClick} />
        ))}
      </>
    ),
  };

  return (
    <Container>
      <div className='mb-4 text-right'>
        <Button>ADD USER</Button>
      </div>
      <GenericTable<UserTableItem> headers={headers} items={items} customRenderers={customRenderers} />
    </Container>
  );
};
