import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteAgentMutation } from 'common/api/agentApi';
import { CustomToggle } from 'common/components/CustomToggle';
import { ColumnBreakpoints } from 'common/components/DataTable/Responsiveness/models/ColumnBreakpoints';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';
import { useModalWithData } from 'common/hooks/useModalWithData';
import { Agent } from 'common/models';
import * as notificationService from 'common/services/notification';
import { ActionButtonProps, TableActionsStyling } from 'common/styles/button';
import { getBorderRadiusForDropdownItem } from 'common/styles/utilities';
import { useRbac } from 'features/rbac';
import { useMemo } from 'react';
import { Dropdown } from 'react-bootstrap';
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
  initialColumnBreakpointVisibility: ColumnBreakpoints;
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
          <Dropdown onClick={e => e.stopPropagation()}>
            <Dropdown.Toggle as={CustomToggle} id='dropdown-basic'>
              <TableActionsStyling>
                <FontAwesomeIcon icon={['fas', 'ellipsis-h']} size='xs' />
              </TableActionsStyling>
            </Dropdown.Toggle>
            <Dropdown.Menu className='p-0'>
              {actions.map((action, index) => (
                <Dropdown.Item
                  className={getBorderRadiusForDropdownItem(index, actions.length)}
                  key={action.text}
                  {...action}
                >
                  {action.text}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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

  const initialColumnBreakpointVisibility: ColumnBreakpoints = {
    name: { xs: true, sm: true, md: true, lg: true, xl: true, xxl: true },
    email: { xs: false, sm: true, md: true, lg: true, xl: true, xxl: true },
    phoneNumber: { xs: false, sm: false, md: true, lg: true, xl: true, xxl: true },
    actions: { xs: true, sm: true, md: true, lg: true, xl: true, xxl: true },
  };

  return {
    columns,
    data,
    initialColumnBreakpointVisibility,
  };
};
