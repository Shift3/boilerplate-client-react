import { useGetUsersQuery } from 'common/api/userApi';
import { DataTable } from 'common/components/DataTable';
import { DataTableSearchAndFilters } from 'common/components/DataTable/DataTableSearchAndFilters';
import { FilterInfo } from 'common/components/DataTable/FilterDropdown';
import { RecentDateFilter, EnumFilter, StringFilter } from 'common/components/DataTable/Filters';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { usePSFQuery } from 'common/hooks';
import { PaginatedResult, User } from 'common/models';
import { CreateButton } from 'common/styles/button';
import { TableCard } from 'common/styles/card';
import { PageHeader } from 'common/styles/page';
import { HasPermission } from 'features/rbac';
import { FC, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { Trans } from 'react-i18next';
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
    addSearchText,
  } = usePSFQuery<PaginatedResult<User>>(useGetUsersQuery);
  const users = useMemo(() => data?.results ?? [], [data]);
  const { columns, data: tableData } = useUserTableData(users);
  const isPageLoading = isLoading;

  const filters: FilterInfo[] = useMemo(
    () => [
      {
        attribute: 'firstName',
        attributeLabel: 'First Name',
        FilterUI: StringFilter(),
      },
      {
        attribute: 'lastName',
        attributeLabel: 'Last Name',
        FilterUI: StringFilter(),
      },
      {
        attribute: 'role',
        attributeLabel: 'Role',
        FilterUI: EnumFilter([
          { label: 'User', value: 'USER' },
          { label: 'Editor', value: 'EDITOR' },
          { label: 'Admin', value: 'ADMIN' },
        ]),
      },
      {
        attribute: 'activatedAt',
        attributeLabel: 'Activated Date',
        FilterUI: RecentDateFilter([30, 90, 180]),
      },
    ],
    [],
  );

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>
            <Trans i18nKey='userList.heading'>User List</Trans>
          </h1>
          <p>
            <Trans i18nKey='userList.subheading'>Active and invited users in the system.</Trans>
          </p>
        </div>
        <HasPermission perform='user:create'>
          <div>
            <Link to='/users/create-user'>
              <CreateButton>
                <Trans i18nKey='userList.createButton'>Add User</Trans>
              </CreateButton>
            </Link>
          </div>
        </HasPermission>
      </PageHeader>

      <DataTableSearchAndFilters
        filters={filters}
        onSetFilter={addFilter}
        onRemoveFilter={removeFilter}
        onClearFilters={resetFilters}
        onSetSearchText={addSearchText}
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
