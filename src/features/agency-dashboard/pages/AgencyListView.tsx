import { useGetAgenciesQuery } from 'common/api/agencyApi';
import { PageHeader, TableCard } from 'common/components/Common';
import { DataTable } from 'common/components/DataTable';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { usePSFQuery } from 'common/hooks';
import { Agency, PaginatedResult } from 'common/models';
import { CreateButton } from 'common/styles/button';
import { HasPermission } from 'features/rbac';
import { FC, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import { AgencyTableItem, useAgencyTableData } from '../hooks/useAgencyTableData';

export const AgencyListView: FC = () => {
  const history = useHistory();
  const { data, isLoading, page, pageSize, getPage, changePageSize, changeSortBy } =
    usePSFQuery<PaginatedResult<Agency>>(useGetAgenciesQuery);
  const agencies = useMemo(() => data?.results ?? [], [data]);
  const { columns, data: tableData } = useAgencyTableData(agencies);
  const isPageLoading = isLoading;

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>Agency List</h1>
          <p className='text-muted'>Agencies are able to view a seperate set of information.</p>
        </div>
        <HasPermission perform='agency:create'>
          <div>
            <Link to='/agencies/create-agency'>
              <CreateButton>Add Agency</CreateButton>
            </Link>
          </div>
        </HasPermission>
      </PageHeader>
      <TableCard>
        <TableCard.Body>
          <WithLoadingOverlay isLoading={isPageLoading}>
            <DataTable<AgencyTableItem>
              columns={columns}
              data={tableData}
              onRowClick={item => history.push(`agencies/update-agency/${item.id}`)}
              pagination={{
                basePage: 1,
                page,
                pageSize,
                count: data?.meta.count || 0,
                pageCount: data?.meta.pageCount || 0,
                pageSizeOptions: [5, 10, 25, 50, 100],
                onPageChange: getPage,
                onPageSizeChange: changePageSize,
              }}
              sorting={{
                onSortByChange: changeSortBy,
              }}
            />
          </WithLoadingOverlay>
        </TableCard.Body>
      </TableCard>
    </Container>
  );
};
