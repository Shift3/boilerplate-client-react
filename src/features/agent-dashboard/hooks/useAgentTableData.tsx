import { useDeleteAgentMutation } from 'common/api/agentApi';
import { Agent } from 'common/models';
import * as notificationService from 'common/services/notification';
import { ActionButton, ActionButtonProps } from 'common/styles/button';
import { useConfirmationModal } from 'features/confirmation-modal';
import { useRbac } from 'features/rbac';
import { useCallback, useMemo } from 'react';
import { Column } from 'react-table';
import { formatPhoneNumber } from 'utils/phone';

export type AgentTableItem = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  actions: ActionButtonProps[];
};

export type UseAgentTableData = (agents?: Agent[]) => {
  columns: Column<AgentTableItem>[];
  data: AgentTableItem[];
};

export const useAgentTableData: UseAgentTableData = (agents = []) => {
  const [deleteAgent] = useDeleteAgentMutation();
  const { openModal } = useConfirmationModal();
  const { userHasPermission } = useRbac();

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
      { accessor: 'email', Header: 'Email' },
      {
        accessor: 'phoneNumber',
        Header: 'Phone Number',
        Cell: ({ value }) => <span>{formatPhoneNumber(value)}</span>,
      },
      {
        accessor: 'actions',
        Header: '',
        Cell: ({ value: actions }) => (
          <>
            {actions.map(action => (
              <ActionButton key={action.text} {...action} />
            ))}
          </>
        ),
        disableSortBy: true,
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
        email: agent.email,
        phoneNumber: agent.phoneNumber,
        actions: [
          {
            text: 'Delete',
            onClick: e => {
              e.stopPropagation();
              handleDelete(agent);
            },
            show: userHasPermission({ permission: 'agent:delete', data: agent }),
          },
        ],
      })),
    [agents, userHasPermission, handleDelete],
  );

  return {
    columns,
    data,
  };
};
