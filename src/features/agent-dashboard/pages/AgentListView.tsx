import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAgentsQuery } from 'common/api/agentApi';
import { NoContent, PageHeader, TableCard } from 'common/components/Common';
import { DataTable } from 'common/components/DataTable';
import { DataTableFilter, FilterInfo } from 'common/components/DataTable/Filter';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { usePSFQuery } from 'common/hooks';
import { Agent, PaginatedResult } from 'common/models';
import { SecondaryButton, CreateButton } from 'common/styles/button';
import { HasPermission } from 'features/rbac';
import { FC, useMemo } from 'react';
import { Card, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import { AgentTableItem, useAgentTableData } from '../hooks/useAgentTableData';

export const AgentListView: FC = () => {
  const history = useHistory();
  const { data, isLoading, page, pageSize, getPage, changePageSize, changeSortBy, filters, addFilter, removeFilter } =
    usePSFQuery<PaginatedResult<Agent>>(useGetAgentsQuery);
  const agents = useMemo(() => data?.results ?? [], [data]);
  const { columns, data: tableData } = useAgentTableData(agents);
  const isPageLoading = isLoading;

  const SelectFilterUI: FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
    return (
      <Form.Select value={value} onChange={e => onChange(e.target.value)}>
        <option value='one'>One</option>
        <option value='two'>Two</option>
        <option value='three'>Three</option>
      </Form.Select>
    );
  };

  const clearAllFilters = () => {
    console.log('remove all');
  };

  const defaultFilter: FilterInfo = {
    attribute: 'name',
    attributeLabel: 'Name',
    operationOptions: [
      {
        operation: 'icontains',
        operationLabel: 'contains',
      },
    ],
  };

  const extraFilters: FilterInfo[] = [
    {
      attribute: 'name',
      attributeLabel: 'Name',
      operationOptions: [
        {
          operation: 'eq',
          operationLabel: 'is',
          InputUI: SelectFilterUI,
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
  ];

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
      <DataTableFilter
        defaultFilter={defaultFilter}
        extraFilters={extraFilters}
        onSetFilter={addFilter}
        onRemoveFilter={removeFilter}
        onClearFilters={clearAllFilters}
      />
      <TableCard>
        <Card.Body>
          <WithLoadingOverlay isLoading={isPageLoading}>
            {data?.meta.count ? (
              <>
                <DataTable<AgentTableItem>
                  columns={columns}
                  data={tableData}
                  onRowClick={item => history.push(`agents/update-agent/${item.id}`)}
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
              </>
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
