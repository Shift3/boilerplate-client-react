/* eslint-disable no-console */
/* eslint-disable react/no-unused-prop-types */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GenericTable } from 'components/genericTable';
import { TableHeader } from 'components/genericTable/types';
import { FC } from 'react';
import styled from 'styled-components';

// --------------------------------------------------------
//  Posts Table
// --------------------------------------------------------
type PostsTableItem = {
  id: number;
  title: string;
  body: string;
};

const postsTableItems: PostsTableItem[] = [
  { id: 1, title: 'One', body: 'This is the first post.' },
  { id: 2, title: 'Two', body: 'This is the second post.' },
  { id: 3, title: 'Three', body: 'This is the third post.' },
];

const postsTableHeaders: TableHeader<PostsTableItem>[] = [
  { key: 'title', label: 'Title' },
  { key: 'body', label: 'Body' },
];

// --------------------------------------------------------
// Agents Table
// --------------------------------------------------------
type AgentTableItem = {
  id: number;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  actions: {
    icon: IconProp;
    onClick: () => void;
  }[];
};

const agentTableItems: AgentTableItem[] = [
  {
    id: 1,
    name: 'John Doe',
    description: 'Test agent 1',
    email: 'john@email.com',
    phoneNumber: '5555555555',
    actions: [
      { icon: 'trash-alt', onClick: () => console.log('Delete') },
      { icon: 'edit', onClick: () => console.log('Edit') },
    ],
  },
  {
    id: 2,
    name: 'Jane Doe',
    description: 'Test agent 2',
    email: 'jane@email.com',
    phoneNumber: '4444444444',
    actions: [
      { icon: 'trash-alt', onClick: () => console.log('Delete') },
      { icon: 'edit', onClick: () => console.log('Edit') },
    ],
  },
  {
    id: 3,
    name: 'Alice Smith',
    description: 'Test agent 3',
    email: 'alice@email.com',
    phoneNumber: '3333333333',
    actions: [
      { icon: 'trash-alt', onClick: () => console.log('Delete') },
      { icon: 'edit', onClick: () => console.log('Edit') },
    ],
  },
];

const agentTableHeaders: TableHeader<AgentTableItem>[] = [
  { key: 'name', label: 'NAME' },
  { key: 'description', label: 'DESCRIPTION' },
  { key: 'email', label: 'EMAIL' },
  { key: 'phoneNumber', label: 'PHONE NUMBER' },
  { key: 'actions', label: 'ACTIONS' },
];

const customRenderers = {
  actions: ({ actions }: AgentTableItem) => (
    <>
      {actions.map((action, index) => (
        <span className='px-3 py-1'>
          {/* eslint-disable-next-line react/no-array-index-key */}
          <FontAwesomeIcon key={index} icon={action.icon} onClick={action.onClick} />
        </span>
      ))}
    </>
  ),
};

const DashboardPageContainer = styled.div``;

export const DashboardPage: FC = () => {
  return (
    <DashboardPageContainer data-testid='dashboardPageContainer'>
      <GenericTable<PostsTableItem> items={postsTableItems} headers={postsTableHeaders} customRenderers={{}} />
      <br />
      <br />
      <GenericTable<AgentTableItem>
        items={agentTableItems}
        headers={agentTableHeaders}
        customRenderers={customRenderers}
      />
    </DashboardPageContainer>
  );
};
