/* eslint-disable react/no-unused-prop-types */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GenericTable } from 'components/genericTable';
import { TableHeader } from 'components/genericTable/types';
import { FC } from 'react';
import styled from 'styled-components';

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
      <GenericTable<AgentTableItem>
        items={agentTableItems}
        headers={agentTableHeaders}
        customRenderers={customRenderers}
      />
    </DashboardPageContainer>
  );
};
