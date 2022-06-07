import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAgentsQuery } from 'common/api/agentApi';
import { DataTable } from 'common/components/DataTable';
import { FilterInfo } from 'common/components/DataTable/DataTableActiveFilterList';
import { DataTableSearchAndFilters } from 'common/components/DataTable/DataTableSearchAndFilters';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { usePSFQuery } from 'common/hooks';
import { Agent, PaginatedResult } from 'common/models';
import { SecondaryButton, CreateButton } from 'common/styles/button';
import { TableCard } from 'common/styles/card';
import { PageHeader } from 'common/styles/page';
import { NoContent } from 'common/styles/utilities';
import { HasPermission } from 'features/rbac';
import { FC, useMemo } from 'react';
import { Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { AgentTableItem, useAgentTableData } from '../hooks/useAgentTableData';

export const AgentListView: FC = () => {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isFetching,
    page,
    pageSize,
    getPage,
    changePageSize,
    changeSortBy,
    addFilter,
    removeFilter,
    resetFilters,
    addSearchText,
  } = usePSFQuery<PaginatedResult<Agent>>(useGetAgentsQuery);
  const agents = useMemo(() => data?.results ?? [], [data]);
  const { columns, data: tableData } = useAgentTableData(agents);
  const isPageLoading = isLoading;

  const filters: FilterInfo[] = useMemo(
    () => [
      {
        attribute: 'name',
        attributeLabel: 'Name',
        operationOptions: [
          {
            operation: 'eq',
            operationLabel: 'is',
          },
          {
            operation: 'icontains',
            operationLabel: 'contains',
          },
          {
            operation: 'startswith',
            operationLabel: 'starts with',
          },
          {
            operation: 'endswith',
            operationLabel: 'ends with',
          },
        ],
      },
    ],
    [],
  );

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>Agent List</h1>
          <p className='text-muted'>All agents in the system.</p>
        </div>
        <HasPermission perform='agent:create'>
          <div>
            <Link to='/agents/create-agent'>
              <CreateButton>Add Agent</CreateButton>
            </Link>
          </div>
        </HasPermission>
      </PageHeader>

      <DataTableSearchAndFilters
        placeholder='Search by name'
        filters={filters}
        onSetFilter={addFilter}
        onRemoveFilter={removeFilter}
        onClearFilters={resetFilters}
        onSetSearchText={addSearchText}
      />

      <TableCard>
        <Card.Body>
          <WithLoadingOverlay
            isLoading={isPageLoading || isFetching}
            isInitialLoad={isPageLoading && isFetching}
            containerHasRoundedCorners
            containerBorderRadius='6px'
          >
            {data?.meta.count !== 0 ? (
              <DataTable<AgentTableItem>
                columns={columns}
                data={tableData}
                onRowClick={item => navigate(`/agents/update-agent/${item.id}`)}
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
            ) : (
              <NoContent>
                <FontAwesomeIcon className='text-muted' size='2x' icon={['fas', 'stethoscope']} />
                <p className='lead mb-0'>No Agents</p>

                <HasPermission perform='agent:create'>
                  <p className='text-muted'>Get started by creating a new agent.</p>
                  <Link to='/agents/create-agent'>
                    <SecondaryButton>Add Agent</SecondaryButton>
                  </Link>
                </HasPermission>
              </NoContent>
            )}
          </WithLoadingOverlay>
        </Card.Body>
      </TableCard>
    </Container>
  );
};
