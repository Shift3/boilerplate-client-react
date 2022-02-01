import { PaginatedResult, User } from 'common/models';
import { useGetUsersQuery } from 'common/api/userApi';
import { FC, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { HasPermission } from 'features/rbac';
import { CreateButton } from 'common/styles/button';
import { DataTable } from 'common/components/DataTable';
import { usePSFQuery } from 'common/hooks';
import { UserTableItem, useUserTableData } from '../hooks/useUserTableData';

export const UserListView: FC = () => {
  const { data, isLoading, page, pageSize, getPage, changePageSize } =
    usePSFQuery<PaginatedResult<User>>(useGetUsersQuery);
  const users = useMemo(() => data?.results ?? [], [data]);
  const { columns, data: tableData } = useUserTableData(users);
  const isPageLoading = isLoading;

  return (
    <Container>
      <HasPermission perform='user:create'>
        <div className='mb-4 text-end'>
          <Link to='/users/create-user'>
            <CreateButton>ADD USER</CreateButton>
          </Link>
        </div>
      </HasPermission>
      <WithLoadingOverlay isLoading={isPageLoading}>
        <DataTable<UserTableItem>
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
