import { useDeleteAgentMutation } from 'common/api/agentApi';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';
import { useModalWithData } from 'common/hooks/useModalWithData';
import { Agent } from 'common/models';
import * as notificationService from 'common/services/notification';
import { ActionButton, ActionButtonProps } from 'common/styles/button';
import { useRbac } from 'features/rbac';
import { useMemo } from 'react';
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
  const { userHasPermission } = useRbac();

  const [deleteAgent] = useDeleteAgentMutation();
  const [showDeleteModal, hideDeleteModal] = useModalWithData<Agent>(
    agent =>
      ({ in: open, onExited }) => {
        const onConfirm = async () => {
          await deleteAgent(agent.id);
          notificationService.showSuccessMessage('Agent deleted.');
          hideDeleteModal();
        };

        return (
          <SimpleConfirmModal
            title='Delete Agent'
            show={open}
            onCancel={hideDeleteModal}
            onConfirm={onConfirm}
            confirmLabel='Delete'
            confirmIcon='trash-alt'
            confirmVariant='danger'
            onExited={onExited}
            body={
              <p className='m-0'>
                Are you sure you want to delete the agent named <b>{agent.name}</b>?{' '}
                <span className='text-danger'>
                  Note that this action <b>cannot</b> be undone.
                </span>
              </p>
            }
          />
        );
      },
    [],
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
              showDeleteModal(agent);
            },
            show: userHasPermission({ permission: 'agent:delete', data: agent }),
          },
        ],
      })),
    [agents, userHasPermission, showDeleteModal],
  );

  return {
    columns,
    data,
  };
};
