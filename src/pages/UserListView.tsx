import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { GenericTable } from 'components/genericTable';
import { TableHeader } from 'components/genericTable/types';
import { FC } from 'react';

type UserTableItem = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  // string or icon
  activatedAt: string;
  role: string;
  actions: {
    icon: IconProp;
    onClick: () => void;
  }[];
};

export const UserListView: FC = () => {
  const headers: TableHeader<UserTableItem>[] = [
    { key: 'lastName', label: 'LAST NAME' },
    { key: 'firstName', label: 'FIRST NAME' },
    { key: 'email', label: 'EMAIL' },
    { key: 'role', label: 'ROLE' },
    { key: 'activatedAt', label: 'ACTIVATED' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const items: UserTableItem[] = [];

  return <GenericTable<UserTableItem> headers={headers} items={items} customRenderers={{}} />;
};
