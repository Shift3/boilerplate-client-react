import { useGetUsersQuery } from 'common/api/userApi';
import { NoContent, PageHeader, TableCard } from 'common/components/Common';
import { DataTable } from 'common/components/DataTable';
import {
  AppliedFilterInfo,
  DataTableFilters,
  FilterInfo,
  PredeterminedFilters,
} from 'common/components/DataTable/DataTableFilters';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { RadioButtonOptionSelector } from 'common/components/RadioButtonOptionSelector';
import { usePSFQuery } from 'common/hooks';
import { PaginatedResult, User } from 'common/models';
import { CreateButton } from 'common/styles/button';
import { HasPermission } from 'features/rbac';
import { FC, useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

  const [appliedFilters, setAppliedFilters] = useState<AppliedFilterInfo[]>([]);

  console.log('appliedFilters:', appliedFilters);

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

  const visibleFilters: FilterInfo[] = useMemo(
    () => [
      {
        attribute: 'role',
        attributeLabel: 'Role',
        operationOptions: [
          {
            operation: 'eq',
            operationLabel: 'User',
          },
          {
            operation: 'eq',
            operationLabel: 'Editor',
          },
          {
            operation: 'eq',
            operationLabel: 'Admin',
          },
          {
            operation: 'eq',
            operationLabel: 'Super Administrator',
          },
        ],
        InputUI: RadioButtonOptionSelector,
      },
    ],
    [],
  );

  return (
    <Container>
      <Row className='d-flex'>
        <Col style={{ flex: 4 }}>
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
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            defaultFilterAttribute='firstName'
            defaultFilterOperation='icontains'
            onSetFilter={addFilter}
            onRemoveFilter={removeFilter}
            onClearFilters={resetFilters}
          />
          <TableCard>
            <TableCard.Body>
              <WithLoadingOverlay isLoading={isPageLoading} containerHasRoundedCorners containerBorderRadius='6px'>
                {data?.meta ? (
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
                    isLoading={isFetching}
                  />
                ) : (
                  <NoContent />
                )}
              </WithLoadingOverlay>
            </TableCard.Body>
          </TableCard>
        </Col>
        <Col style={{ flex: 1, marginTop: '.9rem' }}>
          <PredeterminedFilters
            filters={visibleFilters}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            onSetFilter={addFilter}
            onRemoveFilter={removeFilter}
          />
        </Col>
      </Row>
    </Container>
  );
};
