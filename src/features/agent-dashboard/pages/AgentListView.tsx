import { CustomRenderer, GenericTable, TableHeader } from 'common/components';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { Agent } from 'common/models';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { HasPermission, useRbac } from 'features/rbac';
import { useDeleteAgentMutation, useGetAgentsQuery } from 'common/api/agentApi';
import * as notificationService from 'common/services/notification';
import { CreateButton } from 'common/styles/button';
import { useConfirmationModal } from 'features/confirmation-modal';

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
  const { userHasPermission } = useRbac();
  const { data: agents = [], isLoading: isLoadingAgents, isFetching: isFetchingAgents } = useGetAgentsQuery();
  const [deleteAgent] = useDeleteAgentMutation();
  const { openModal } = useConfirmationModal();

  const isPageLoading = isLoadingAgents || isFetchingAgents;

  const navigateToUpdateView = (agent: Agent) => {
    history.push(`/agents/update-agent/${agent.id}`);
  };

  const handleDelete = (agent: Agent) => {
    const message = `Delete ${agent.name}?`;

    const onConfirm = async () => {
      await deleteAgent(agent.id);

      notificationService.showSuccessMessage('Agent deleted.');
    };

    openModal({ message, confirmButtonLabel: 'DELETE', onConfirm });
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
  const items: AgentTableItem[] = agents.map(agent => ({
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
        show: userHasPermission({ permission: 'agent:update', data: agent }),
      },
      {
        icon: 'trash-alt',
        tooltipText: 'Delete',
        onClick: () => handleDelete(agent),
        show: userHasPermission({ permission: 'agent:delete', data: agent }),
      },
    ],
  }));

  const customRenderers: CustomRenderer<AgentTableItem>[] = [
    {
      key: 'actions',
      renderer: ({ actions, id }: AgentTableItem) => (
        <>
          {actions.map(action => (
            <ActionButton key={id} {...action} />
          ))}
        </>
      ),
    },
  ];

  return (
    <Container>
      <HasPermission perform='agent:create'>
        <div className='pb-4 text-end'>
          <Link to='/agents/create-agent'>
            <CreateButton>ADD AGENT</CreateButton>
          </Link>
        </div>
      </HasPermission>
      <WithLoadingOverlay isLoading={isPageLoading}>
        <GenericTable<AgentTableItem> headers={headers} items={items} customRenderers={customRenderers} />
      </WithLoadingOverlay>
    </Container>
  );
};
