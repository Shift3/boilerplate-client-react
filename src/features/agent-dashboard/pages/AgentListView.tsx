import { Agent, PaginatedResult } from 'common/models';
import { FC, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { HasPermission } from 'features/rbac';
import { useGetAgentsQuery } from 'common/api/agentApi';
import { CreateButton } from 'common/styles/button';
import { DataTable } from 'common/components/DataTable';
import { usePSFQuery } from 'common/hooks';
import { AgentTableItem, useAgentTableData } from '../hooks/useAgentTableData';

export const AgentListView: FC = () => {
  const { data, isLoading, page, pageSize, getPage, changePageSize } =
    usePSFQuery<PaginatedResult<Agent>>(useGetAgentsQuery);
  const agents = useMemo(() => data?.results ?? [], [data]);
  const { columns, data: tableData } = useAgentTableData(agents);
  const isPageLoading = isLoading;

  return (
    <Container>
      <HasPermission perform='agent:create'>
        <div className='pb-4 text-end'>
          <Link to='/agents/create-agent'>
            <CreateButton>ADD AGENT</CreateButton>
          </Link>
        </div>
      </HasPermission>
      <WithLoadingOverlay isLoading={isPageLoading}>
        <DataTable<AgentTableItem>
          columns={columns}
          data={tableData}
          pagination={{
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
