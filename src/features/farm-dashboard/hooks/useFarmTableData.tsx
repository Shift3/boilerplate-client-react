import { useDeleteFarmMutation } from 'common/api/farmApi';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';
import { useModalWithData } from 'common/hooks/useModalWithData';
import { Farm } from 'common/models';
import * as notificationService from 'common/services/notification';
import { ActionButton, ActionButtonProps } from 'common/styles/button';
import { useRbac } from 'features/rbac';
import { useMemo } from 'react';
import { Column } from 'react-table';
import { formatPhoneNumber } from 'utils/phone';

export type FarmTableItem = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  actions: ActionButtonProps[];
};

export type UseFarmTableData = (Farms?: Farm[]) => {
  columns: Column<FarmTableItem>[];
  data: FarmTableItem[];
};

export const useFarmTableData: UseFarmTableData = (Farms = []) => {
  const { userHasPermission } = useRbac();

  const [deleteFarm] = useDeleteFarmMutation();
  const [showDeleteModal, hideDeleteModal] = useModalWithData<Farm>(
    Farm =>
      ({ in: open, onExited }) => {
        const onConfirm = async () => {
          await deleteFarm(Farm.id);
          notificationService.showSuccessMessage('Farm deleted.');
          hideDeleteModal();
        };

        return (
          <SimpleConfirmModal
            title='Delete Farm'
            show={open}
            onCancel={hideDeleteModal}
            onConfirm={onConfirm}
            confirmLabel='Delete'
            confirmIcon='trash-alt'
            confirmVariant='danger'
            onExited={onExited}
            body={
              <p className='m-0'>
                Are you sure you want to delete the Farm named <b>{Farm.name}</b>?{' '}
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
  const columns: Column<FarmTableItem>[] = useMemo(
    () => [
      { accessor: 'name', Header: 'Farm Name' },
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

  // Transform Farm objects into the data format expected by the table.
  const data: FarmTableItem[] = useMemo(
    () =>
      Farms.map(Farm => ({
        id: Farm.id,
        name: Farm.name,
        email: Farm.email,
        phoneNumber: Farm.phoneNumber,
        actions: [
          {
            text: 'Delete',
            onClick: e => {
              e.stopPropagation();
              showDeleteModal(Farm);
            },
            show: userHasPermission({ permission: 'Farm:delete', data: Farm }),
          },
        ],
      })),
    [Farms, userHasPermission, showDeleteModal],
  );

  return {
    columns,
    data,
  };
};
