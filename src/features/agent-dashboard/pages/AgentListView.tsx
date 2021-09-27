/* eslint-disable no-console */
import { CustomRenderer, GenericTable, TableHeader } from 'common/components';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { useConfirmationModal } from 'common/hooks';
import { Agent } from 'common/models';
import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useDeleteAgentMutation, useGetAgentsQuery } from '../agentApi';
import { Link, useHistory } from 'react-router-dom';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';

type AgentTableItem = {
  id: number;
  name: string;
  actions: ActionButtonProps[];
};

export const AgentListView: FC = () => {
  const history = useHistory();
  const { data: agents = [] } = useGetAgentsQuery();
  const [deleteAgent] = useDeleteAgentMutation();
  const { Modal: ConfirmationModal, openModal, closeModal } = useConfirmationModal();
  const { showSuccessNotification } = useShowNotification();

  const navigateToUpdateView = (agent: Agent) => {
    history.push(`/agents/update-agent/${agent.id}`);
  };

  const handleDelete = (agent: Agent) => {
    const message = `Delete ${agent.name}?`;

    const onConfirm = () => {
      deleteAgent(agent.id);
      closeModal();
      showSuccessNotification('Agent deleted.');
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

  // Set up table headers
  const headers: TableHeader<AgentTableItem>[] = [
    { key: 'name', label: 'AGENT NAME' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  // Transform Agency objects returned from the API into the table item data format expected by the table.
  const items: AgentTableItem[] = agents.map((agent) => ({
    id: agent.id,
    name: agent.name,
    actions: [
      { icon: 'edit', tooltipText: 'Edit', onClick: () => navigateToUpdateView(agent) },
      {
        icon: 'trash-alt',
        tooltipText: 'Delete',
        onClick: () => handleDelete(agent),
      },
    ],
  }));

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
        <Link to='/agents/create-agent'>
          <Button>ADD AGENT</Button>
        </Link>
      </div>
      <GenericTable<AgentTableItem> headers={headers} items={items} customRenderers={customRenderers} />
      <ConfirmationModal />
    </Container>
  );
};
