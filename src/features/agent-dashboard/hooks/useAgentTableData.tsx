import { useDeleteAgentMutation } from 'common/api/agentApi';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { Agent } from 'common/models';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Column } from 'react-table';
import * as notificationService from 'common/services/notification';
import { useConfirmationModal } from 'features/confirmation-modal';
import { useRbac } from 'features/rbac';

export type AgentTableItem = {
  id: number;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  actions: ActionButtonProps[];
};

export type UseAgentTableData = (agents?: Agent[]) => {
  columns: Column<AgentTableItem>[];
  data: AgentTableItem[];
};

export const useAgentTableData: UseAgentTableData = (agents = []) => {
  const history = useHistory();
  const [deleteAgent] = useDeleteAgentMutation();
  const { openModal } = useConfirmationModal();
  const { userHasPermission } = useRbac();

  const navigateToUpdateView = useCallback(
    (agent: Agent) => {
      history.push(`/agents/update-agent/${agent.id}`);
    },
    [history],
  );

  const handleDelete = useCallback(
    (agent: Agent) => {
      const message = `Delete ${agent.name}?`;

      const onConfirm = async () => {
        await deleteAgent(agent.id);
        notificationService.showSuccessMessage('Agent deleted.');
      };

      openModal({ message, confirmButtonLabel: 'DELETE', onConfirm });
    },
    [openModal, deleteAgent],
  );

  // Set up columns and headers
  const columns: Column<AgentTableItem>[] = useMemo(
    () => [
      { accessor: 'name', Header: 'Agent Name' },
      { accessor: 'description', Header: 'Description' },
      { accessor: 'email', Header: 'Email' },
      { accessor: 'phoneNumber', Header: 'Phone Number' },
      {
        accessor: 'actions',
        Header: 'Action',
        Cell: ({ value: actions, row }) =>
          actions.map(action => <ActionButton key={`${action.icon}-${row.id}`} {...action} />),
      },
    ],
    [],
  );

  // Transform Agent objects into the data format expected by the table.
  const data: AgentTableItem[] = useMemo(
    () =>
      agents.map(agent => ({
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
      })),
    [agents, userHasPermission, handleDelete, navigateToUpdateView],
  );

  return {
    columns,
    data,
  };
};
