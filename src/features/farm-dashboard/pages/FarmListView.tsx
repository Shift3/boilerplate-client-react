import { useGetFarmsQuery } from 'common/api/farmApi';
import { DataTable } from 'common/components/DataTable';
import { DataTableSearchAndFilters } from 'common/components/DataTable/DataTableSearchAndFilters';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { usePSFQuery } from 'common/hooks';
import { Farm, PaginatedResult } from 'common/models';
import { TableCard } from 'common/styles/card';
import { PageHeader } from 'common/styles/page';
import { NoContent } from 'common/styles/utilities';
import { HasPermission } from 'features/rbac';
import { FC, useMemo } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FarmTableItem, useFarmTableData } from '../hooks/useFarmTableData';
import { Trans } from 'react-i18next';
import { StringFilter } from 'common/components/DataTable/Filters';
import { FilterInfo } from 'common/components/DataTable/FilterDropdown';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

export const FarmListView: FC = () => {
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
    filters: psfFilters,
    searchText: psfSearchText,
    addSearchText,
  } = usePSFQuery<PaginatedResult<Farm>>(useGetFarmsQuery);
  const Farms = useMemo(() => data?.results ?? [], [data]);
  const { columns, data: tableData } = useFarmTableData(Farms);

  const isSearchingOrFiltering = useMemo(() => {
    return psfFilters.length > 0 || psfSearchText.length > 0;
  }, [psfFilters, psfSearchText]);

  const filters: FilterInfo[] = useMemo(
    () => [
      {
        attribute: 'name',
        attributeLabel: 'Name',
        FilterUI: StringFilter(),
      },
      {
        attribute: 'email',
        attributeLabel: 'Email',
        FilterUI: StringFilter(),
      },
    ],
    [],
  );

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>
            <Trans i18nKey='FarmList.heading'>Farm List</Trans>
          </h1>
          <p>
            <Trans i18nKey='FarmList.subheading'>All Farms in the system.</Trans>
          </p>
        </div>
        <HasPermission perform='Farm:create'>
          <div>
            <Link to='/Farms/create-Farm'>
              <Button>
                <Trans i18nKey='FarmList.createButton'>Add Farm</Trans>
              </Button>
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
        <Card.Body>
          <WithLoadingOverlay isLoading={isLoading || isFetching} isInitialLoad={isLoading && isFetching}>
            {isSearchingOrFiltering || isLoading || isFetching || data?.meta.count !== 0 ? (
              <DataTable<FarmTableItem>
                columns={columns}
                data={tableData}
                onRowClick={item => navigate(`/Farms/update-Farm/${item.id}`)}
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
              <NoContent
                title='No Farms'
                icon={faStethoscope}
                extra={
                  <HasPermission perform='Farm:create'>
                    <p className='text-muted'>Get started by creating a new Farm.</p>
                    <Link to='/Farms/create-Farm'>
                      <Button variant='default'>Add Farm</Button>
                    </Link>
                  </HasPermission>
                }
              />
            )}
          </WithLoadingOverlay>
        </Card.Body>
      </TableCard>
    </Container>
  );
};
