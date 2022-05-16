import { useGetUsersQuery } from 'common/api/userApi';
import { DataTable } from 'common/components/DataTable';
import { DataTableFilters, FilterInfo } from 'common/components/DataTable/DataTableFilters';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { usePSFQuery } from 'common/hooks';
import { PaginatedResult, User } from 'common/models';
import { CreateButton } from 'common/styles/button';
import { TableCard } from 'common/styles/card';
import { PageHeader } from 'common/styles/page';
import { HasPermission } from 'features/rbac';
import { FC, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { UserTableItem, useUserTableData } from '../hooks/useUserTableData';

export const UserListView: FC = () => {
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
  } = usePSFQuery<PaginatedResult<User>>(useGetUsersQuery);
  const users = useMemo(() => data?.results ?? [], [data]);
  const { columns, data: tableData } = useUserTableData(users);
  const isPageLoading = isLoading;

  const filters: FilterInfo[] = useMemo(
    () => [
      {
        attribute: 'firstName',
        attributeLabel: 'First Name',
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
      {
        attribute: 'lastName',
        attributeLabel: 'Last Name',
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
          <h1>User List</h1>
          <p className='text-muted'>Active and invited users in the system.</p>
        </div>
        <HasPermission perform='user:create'>
          <div>
            <Link to='/users/create-user'>
              <CreateButton>Add User</CreateButton>
            </Link>
          </div>
        </HasPermission>
      </PageHeader>
      <DataTableFilters
        filters={filters}
        defaultFilterAttribute='firstName'
        defaultFilterOperation='icontains'
        onSetFilter={addFilter}
        onRemoveFilter={removeFilter}
        onClearFilters={resetFilters}
      />
      <TableCard>
        <TableCard.Body>
          <WithLoadingOverlay
            isLoading={isPageLoading || isFetching}
            isInitialLoad={isPageLoading && isFetching}
            containerHasRoundedCorners
            containerBorderRadius='6px'
          >
            <DataTable<UserTableItem>
              columns={columns}
              data={tableData}
              onRowClick={item => navigate(`/users/update-user/${item.id}`)}
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
