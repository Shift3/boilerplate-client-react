import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useDeleteAgencyMutation } from 'common/api/agencyApi';
import { handleApiError } from 'common/api/handleApiError';
import { ActionButtonProps } from 'common/components/ActionButton';
import { Agency } from 'common/models';
import * as notificationService from 'common/services/notification';
import { ActionButton } from 'common/styles/button';
import { useConfirmationModal } from 'features/confirmation-modal';
import { useRbac } from 'features/rbac';
import { useCallback, useMemo } from 'react';
import { Column } from 'react-table';

export type AgencyTableItem = {
  id: number;
  name: string;
  actions: ActionButtonProps[];
};

export type UseAgencyTableData = (agencies?: Agency[]) => {
  columns: Column<AgencyTableItem>[];
  data: AgencyTableItem[];
};

export const useAgencyTableData: UseAgencyTableData = (agencies = []) => {
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
        Header: '',
        Cell: ({ value: actions }) => (
          <>
            {actions.map(action => (
              <>
                <ActionButton {...action}>
                  {action.tooltipText}
                </ActionButton>
              </>
            ))}
          </>
        )
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
            tooltipText: 'Delete',
            onClick: (e) => {
              e.stopPropagation();
              handleDelete(agency);
            },
            show: userHasPermission('agency:delete'),
          },
        ],
      })),
    [agencies, userHasPermission, handleDelete ],
  );

  return { columns, data };
};
