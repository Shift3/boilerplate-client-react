import { useGetUsersQuery } from 'common/api/userApi';
import { PageHeader, TableCard } from 'common/components/Common';
import { DataTable } from 'common/components/DataTable';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { usePSFQuery } from 'common/hooks';
import { PaginatedResult, User } from 'common/models';
import { CreateButton } from 'common/styles/button';
import { HasPermission } from 'features/rbac';
import { FC, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import { UserTableItem, useUserTableData } from '../hooks/useUserTableData';

export const UserListView: FC = () => {
  const history = useHistory();
  const { data, isLoading, page, pageSize, getPage, changePageSize, changeSortBy, isFetching } =
    usePSFQuery<PaginatedResult<User>>(useGetUsersQuery);
  const users = useMemo(() => data?.results ?? [], [data]);
  const { columns, data: tableData } = useUserTableData(users);
  const isPageLoading = isLoading;

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
      <TableCard hideOverflow={isFetching}>
        <TableCard.Body>
          <WithLoadingOverlay isLoading={isPageLoading}>
            <DataTable<UserTableItem>
              columns={columns}
              data={tableData}
              onRowClick={item => history.push(`users/update-user/${item.id}`)}
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
              isLoading={isFetching}
            />
          </WithLoadingOverlay>
        </TableCard.Body>
      </TableCard>
    </Container>
  );
};
