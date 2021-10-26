import { CustomRenderer, GenericTable, TableHeader } from 'common/components';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { useConfirmationModal } from 'common/hooks';
import { Agent } from 'common/models';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useDeleteAgentMutation, useGetAgentsQuery } from '../agentApi';
import { Link, useHistory } from 'react-router-dom';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { CreateButton } from 'features/styles/PageStyles';
import { Can, useRbac } from 'features/rbac';

type AgentTableItem = {
  id: number;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  actions: ActionButtonProps[];
};

export const AgentListView: FC = () => {
  const history = useHistory();
  const { userCan } = useRbac();
  const { data: agents = [], isLoading: isLoadingAgents } = useGetAgentsQuery();
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
    { key: 'description', label: 'DESCRIPTION' },
    { key: 'email', label: 'EMAIL' },
    { key: 'phoneNumber', label: 'PHONE NUMBER' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  // Transform Agent objects returned from the API into the table item data format expected by the table.
  const items: AgentTableItem[] = agents.map((agent) => ({
    id: agent.id,
    name: agent.name,
    description: agent.description,
    email: agent.email,
    phoneNumber: agent.phoneNumber,
    actions: [
      {
        icon: 'edit',
        tooltipText: 'Edit',
        onClick: () => navigateToUpdateView(agent),
        show: userCan({ permission: 'agent:update', data: agent }),
      },
      {
        icon: 'trash-alt',
        tooltipText: 'Delete',
        onClick: () => handleDelete(agent),
        show: userCan({ permission: 'agent:delete', data: agent }),
      },
    ],
  }));

  const customRenderers: CustomRenderer<AgentTableItem>[] = [
    {
      key: 'actions',
      renderer: ({ actions }: AgentTableItem) => (
        <>
          {actions.map((action, index) => (
            <ActionButton key={index} {...action} />
          ))}
        </>
      ),
    },
  ];

  return (
    <Container>
      <Can perform='agent:create'>
        <div className='pb-4 text-end'>
          <Link to='/agents/create-agent'>
            <CreateButton>ADD AGENT</CreateButton>
          </Link>
        </div>
      </Can>
      <WithLoadingOverlay isLoading={isLoadingAgents}>
        <GenericTable<AgentTableItem> headers={headers} items={items} customRenderers={customRenderers} />
      </WithLoadingOverlay>
      <ConfirmationModal />
    </Container>
  );
};
