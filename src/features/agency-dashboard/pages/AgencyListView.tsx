import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { Agency } from 'common/models';
import { Link, useHistory } from 'react-router-dom';
import { FC, useCallback, useEffect, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { HasPermission, useRbac } from 'features/rbac';
import { useDeleteAgencyMutation, useGetAgenciesQuery } from 'common/api/agencyApi';
import * as notificationService from 'common/services/notification';
import { CreateButton } from 'common/styles/button';
import { useConfirmationModal } from 'features/confirmation-modal';
import { usePagination } from 'common/api/pagination';
import { Column } from 'react-table';
import { DataTable } from 'common/components/DataTable';

type AgencyTableItem = {
  id: number;
  name: string;
  actions: ActionButtonProps[];
};

export const AgencyListView: FC = () => {
  const history = useHistory();
  const { userHasPermission } = useRbac();
  const paginator = usePagination();
  const { data, isLoading, isFetching } = useGetAgenciesQuery({ page: paginator.page, pageSize: paginator.pageSize });
  const [deleteAgency] = useDeleteAgencyMutation();
  const { openModal } = useConfirmationModal();
  const agencies = useMemo(() => data?.results ?? [], [data]);
  const isPageLoading = isLoading || isFetching;

  useEffect(() => {
    paginator.updateCount(data?.meta.count ?? 0);
    paginator.updatePageCount(data?.meta.pageCount ?? 0);
  }, [data?.meta.count, data?.meta.pageCount, paginator.updateCount, paginator.updatePageCount]);

  const handleDelete = useCallback(
    (agency: Agency) => {
      const message = `Delete ${agency.agencyName}?`;

      const onConfirm = async () => {
        await deleteAgency(agency.id);
        notificationService.showSuccessMessage('Agency deleted.');
      };

      openModal({ message, confirmButtonLabel: 'DELETE', onConfirm });
    },
    [deleteAgency, openModal],
  );

  const columns: Column<AgencyTableItem>[] = useMemo(
    () => [
      { accessor: 'name', Header: 'Agency Name' },
      {
        accessor: 'actions',
        Header: 'Actions',
        Cell: ({ value, row }) => value.map(props => <ActionButton key={`${row}-${props.icon}`} {...props} />),
      },
    ],
    [],
  );

  const items: AgencyTableItem[] = useMemo(
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

  return (
    <Container>
      <HasPermission perform='agency:create'>
        <div className='pb-4 text-end'>
          <Link to='/agencies/create-agency'>
            <CreateButton>ADD AGENCY</CreateButton>
          </Link>
        </div>
      </HasPermission>
      <WithLoadingOverlay isLoading={isPageLoading}>
        <DataTable<AgencyTableItem>
          columns={columns}
          data={items}
          pagination={{
            page: paginator.page,
            pageSize: paginator.pageSize,
            count: paginator.count,
            pageCount: paginator.pageCount,
            hasNextPage: paginator.hasNextPage,
            hasPreviousPage: paginator.hasPreviousPage,
            pageSizeOptions: [5, 10, 25, 50, 100],
            getPage: paginator.getPage,
            getNextPage: paginator.getNextPage,
            getPreviousPage: paginator.getPreviousPage,
            setPageSize: paginator.setPageSize,
          }}
        />
      </WithLoadingOverlay>
    </Container>
  );
};
