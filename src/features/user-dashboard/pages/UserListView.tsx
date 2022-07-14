import { useGetUsersQuery } from 'common/api/userApi';
import { DataTable } from 'common/components/DataTable';
import { FilterInfo } from 'common/components/DataTable/DataTableActiveFilterList';
import { DataTableSearchAndFilters } from 'common/components/DataTable/DataTableSearchAndFilters';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { usePSFQuery } from 'common/hooks';
import { FilterOp, PaginatedResult, Role, User } from 'common/models';
import { CreateButton } from 'common/styles/button';
import { TableCard } from 'common/styles/card';
import { PageHeader } from 'common/styles/page';
import { HasPermission } from 'features/rbac';
import { FC, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { UserTableItem, useUserTableData } from '../hooks/useUserTableData';
import { Trans } from 'react-i18next';
import { Form } from 'react-bootstrap';

const MultipleSelect = (options: { label: string; value: string }[]) => {
  const initialState: { [key in string]: boolean } = {};
  options.forEach(option => {
    initialState[option.value] = true;
  });
  const Component: FC<{
    attribute: string;
    setFilter: (name: string, op: FilterOp, value: string) => void;
    removeFilter: (attribute: string, operation: FilterOp) => void;
  }> = ({ attribute, setFilter, removeFilter }) => {
    const [state, setState] = useState(initialState);

    const toggleOption = (option: { label: string; value: string }) => {
      state[option.value] = !state[option.value];
      setState(state);

      const arr: string[] = [];
      Object.entries(state).forEach(([k, v]) => {
        if (v) arr.push(k);
      });

      if (arr.length === options.length) {
        removeFilter(attribute, 'in');
        removeFilter(attribute, 'isnull');
      } else if (arr.length > 0) setFilter(attribute, 'in', arr.join(','));
      else setFilter(attribute, 'isnull', 'true');
    };

    return (
      <div>
        {options.map(option => (
          <Form.Group className='mb-1' controlId={option.value}>
            <Form.Check
              onChange={() => toggleOption(option)}
              checked={state[option.value]}
              type='checkbox'
              label={option.label}
            />
          </Form.Group>
        ))}
      </div>
    );
  };
  return Component;
};

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
      },
      {
        attribute: 'lastName',
        attributeLabel: 'Last Name',
      },
      {
        attribute: 'role',
        attributeLabel: 'Role',
        operationOptions: [],
        OperationUI: MultipleSelect([
          { label: 'User', value: 'USER' },
          { label: 'Editor', value: 'EDITOR' },
          { label: 'Admin', value: 'ADMIN' },
        ]),
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
