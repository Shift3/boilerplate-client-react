/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
import { GenericTable } from 'common/components';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { CustomRenderer, TableHeader } from 'common/components/GenericTable/types';
import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useGetAgentsQuery } from '../agentApi';

type AgentTableItem = {
  id: number;
  name: string;
  actions: ActionButtonProps[];
};

export const AgentListView: FC = () => {
  const { data: agents = [] } = useGetAgentsQuery();

  // Set up table headers
  const headers: TableHeader<AgentTableItem>[] = [
    { key: 'name', label: 'AGENT NAME' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  // Transform Agency objects returned from the API into the table item data format expected by the table.
  const items: AgentTableItem[] = agents.map(
    (agent) => ({
      id: agent.id,
      name: agent.name,
      actions: [
        { icon: 'edit', tooltipText: 'Edit', onClick: () => console.log(`Edit ${agent.name}`) },
        {
          icon: 'trash-alt',
          tooltipText: 'Delete',
          onClick: () => console.log(`Delete ${agent.name}`),
        },
      ],
    }),
    [agents],
  );

  const customRenderers: CustomRenderer<AgentTableItem>[] = [
    {
      key: 'actions',
      renderer: ({ actions }: AgentTableItem) => (
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
      <div className='pb-4 text-right'>
        <Button>ADD AGENT</Button>
      </div>
      <GenericTable<AgentTableItem> headers={headers} items={items} customRenderers={customRenderers} />
    </Container>
  );
};
