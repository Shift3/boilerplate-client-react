import { Link } from 'react-router-dom';
import { FC, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { HasPermission } from 'features/rbac';
import { useGetAgenciesQuery } from 'common/api/agencyApi';
import { CreateButton } from 'common/styles/button';
import { DataTable } from 'common/components/DataTable';
import { AgencyTableItem, useAgencyTableData } from '../hooks/useAgencyTableData';
import { Agency, PaginatedResult } from 'common/models';
import { usePSFQuery } from 'common/hooks';

export const AgencyListView: FC = () => {
  const { data, isLoading, page, pageSize, getPage, changePageSize } =
    usePSFQuery<PaginatedResult<Agency>>(useGetAgenciesQuery);
  const agencies = useMemo(() => data?.results ?? [], [data]);
  const { columns, data: tableData } = useAgencyTableData(agencies);
  const isPageLoading = isLoading;

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
          data={tableData}
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
        />
      </WithLoadingOverlay>
    </Container>
  );
};
