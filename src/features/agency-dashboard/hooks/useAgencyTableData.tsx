import { useDeleteAgencyMutation } from 'common/api/agencyApi';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { Agency } from 'common/models';
import { useConfirmationModal } from 'features/confirmation-modal';
import { useRbac } from 'features/rbac';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Column } from 'react-table';
import * as notificationService from 'common/services/notification';
import { handleApiError } from 'common/api/handleApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export type AgencyTableItem = {
  id: number;
  name: string;
  actions: ActionButtonProps[];
};

export type UseAgencyTableData = (agencies?: Agency[]) => {
  columns: Column<AgencyTableItem>[];
  data: AgencyTableItem[];
};

export const useAgencyTableData: UseAgencyTableData = (agencies: Agency[] = []) => {
  const history = useHistory();
  const { userHasPermission } = useRbac();
  const [deleteAgency] = useDeleteAgencyMutation();
  const { openModal } = useConfirmationModal();

  // Open confirmation modal and require user confirmation before deleting record.
  const handleDelete = useCallback(
    (agency: Agency) => {
      const message = `Delete ${agency.agencyName}?`;

      const onConfirm = async () => {
        try {
          await deleteAgency(agency.id).unwrap();
          notificationService.showSuccessMessage(`Agency "${agency.agencyName}" deleted.`);
        } catch (error) {
          handleApiError(error as FetchBaseQueryError);
        }
      };

      openModal({ message, confirmButtonLabel: 'DELETE', onConfirm });
    },
    [deleteAgency, openModal],
  );

  // Map the property names in AgencyTableItem to column header. Note that the 'actions' property is
  // an array of objects and requires custom rendering logic specified by the "Cell" prop.
  const columns: Column<AgencyTableItem>[] = useMemo(
    () => [
      { accessor: 'name', Header: 'Agency Name' },
      {
        accessor: 'actions',
        Header: 'Actions',
        Cell: ({ value: actions, row }) =>
          actions.map(action => <ActionButton key={`${action.icon}-${row.id}`} {...action} />),
      },
    ],
    [],
  );

  // Map records to data items for the table.
  const data: AgencyTableItem[] = useMemo(
    () =>
      agencies.map(agency => ({
        id: agency.id,
        name: agency.agencyName,
        actions: [
          {
            icon: 'edit',
            tooltipText: 'Edit',
            onClick: () => history.push(`/agencies/update-agency/${agency.id}`),
            show: userHasPermission('agency:update'),
          },
          {
            icon: 'trash-alt',
            tooltipText: 'Delete',
            onClick: () => handleDelete(agency),
            show: userHasPermission('agency:delete'),
          },
        ],
      })),
    [agencies, userHasPermission, handleDelete, history],
  );

  return { columns, data };
};
