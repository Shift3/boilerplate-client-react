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

export type UseFarmTableData = (farms?: Farm[]) => {
  columns: Column<FarmTableItem>[];
  data: FarmTableItem[];
};

export const useFarmTableData: UseFarmTableData = (farms = []) => {
  const { userHasPermission } = useRbac();

  const [deleteFarm] = useDeleteFarmMutation();
  const [showDeleteModal, hideDeleteModal] = useModalWithData<Farm>(
    farm =>
      ({ in: open, onExited }) => {
        const onConfirm = async () => {
          await deleteFarm(farm.id);
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
                Are you sure you want to delete the Farm named <b>{farm.name}</b>?{' '}
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
      farms.map(farm => ({
        id: farm.id,
        name: farm.name,
        email: farm.email,
        phoneNumber: farm.phoneNumber,
        actions: [
          {
            text: 'Delete',
            onClick: e => {
              e.stopPropagation();
              showDeleteModal(farm);
            },
            show: userHasPermission({ permission: 'farm:delete', data: farm }),
          },
        ],
      })),
    [farms, userHasPermission, showDeleteModal],
  );

  return {
    columns,
    data,
  };
};
