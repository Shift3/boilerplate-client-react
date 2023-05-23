import { useDeleteFarmMutation } from 'common/api/farmApi';
import { ResponsiveColumn } from 'common/components/DataTable';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';
import { useModalWithData } from 'common/hooks/useModalWithData';
import { Farm } from 'common/models';
import * as notificationService from 'common/services/notification';
import { ActionButton, ActionButtonProps } from 'common/styles/button';
import { useRbac } from 'features/rbac';
import { useMemo } from 'react';
import { formatPhoneNumber } from 'utils/phone';
import { Trans, useTranslation } from 'react-i18next';

export type FarmTableItem = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  actions: ActionButtonProps[];
};

export const useFarmTableData = (farms: Farm[] = []) => {
  const { userHasPermission } = useRbac();
  const { t } = useTranslation(['translation', 'common']);

  const [deleteFarm] = useDeleteFarmMutation();
  const [showDeleteModal, hideDeleteModal] = useModalWithData<Farm>(
    farm =>
      ({ in: open, onExited }) => {
        const onConfirm = async () => {
          await deleteFarm(farm.id);
          notificationService.showSuccessMessage(t('farmTable.farmDeleted'));
          hideDeleteModal();
        };

        return (
          <SimpleConfirmModal
            title={t('farmTable.deleteFarm')}
            show={open}
            onCancel={hideDeleteModal}
            onConfirm={onConfirm}
            confirmLabel={t('delete', { ns: 'common' })!}
            confirmIcon='trash-alt'
            confirmVariant='danger'
            onExited={onExited}
            body={
              <p className='m-0'>
                <Trans i18nKey='farmTable.areYouSureYouWantToDelete'>
                  Are you sure you want to delete the farm named <b>{farm.name}</b>?
                </Trans>
                <span className='text-danger'>{t('actionCannotBeUndone', { ns: 'common' })}</span>
              </p>
            }
          />
        );
      },
    [t],
  );

  // Set up columns and headers

  const columns: ResponsiveColumn<FarmTableItem>[] = useMemo(
    () => [
      { accessor: 'name', Header: t('farmTable.farmName')! },
      { accessor: 'email', responsive: 'sm', Header: t('email', { ns: 'common' })! },
      {
        accessor: 'phoneNumber',
        responsive: 'md',
        Header: t('phoneNumber', { ns: 'common' })!,
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
    [t],
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
            text: t('delete', { ns: 'common' }),
            onClick: e => {
              e.stopPropagation();
              showDeleteModal(farm);
            },
            show: userHasPermission({ permission: 'farm:delete', data: farm }),
          },
        ],
      })),
    [farms, userHasPermission, showDeleteModal, t],
  );

  return {
    columns,
    data,
  };
};
