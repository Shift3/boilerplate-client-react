import { SortOrder } from 'common/models/sorting';
import { ReactElement, useEffect } from 'react';
import { Column, useFlexLayout, usePagination, useSortBy, useTable } from 'react-table';
import { Paginator } from './Paginator';
import { SortIndicator } from './SortIndicator';

export type DataTableProps<D extends Record<string, unknown>> = {
  columns: Column<D>[];
  data: D[];
  onRowClick?: (item: D) => void;
  pagination?: {
    basePage: 0 | 1; // Whether to treat page 0 or 1 as the first page of the result set.
    page: number;
    pageSize: number;
    count: number;
    pageCount: number;
    pageSizeOptions: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
  sorting?: {
    onSortByChange: (sortBy: SortOrder | undefined) => void;
  };
};

export const DataTable = <D extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  pagination,
  sorting,
}: DataTableProps<D>): ReactElement => {
  // Evaluate these conditions once instead of re-computing in multiple places.
  const sortByEnabled = sorting !== undefined;
  const paginationEnabled = pagination !== undefined;

  // Determine which react-table plugins should be enabled.
  const plugins = [
    // The order in which plugins are specified matters to react-table.
    // Order needs to be useFilter -> useSortBy -> usePagination.
    ...(sortByEnabled ? [useSortBy] : []),
    ...(paginationEnabled ? [usePagination] : []),
  ];

  // Generate the required initial state for the enabled plugins.
  const initialState = {
    ...(sortByEnabled ? {} : {}), // TODO: add initial state for sorting
    ...(paginationEnabled ? { pageIndex: 0, pageSize: pagination.pageSize } : {}),
  };

  // Generate the required table options for the enabled plugins.
  const extraTableOptions = {
    ...(sortByEnabled
      ? {
          manualSortBy: true,
          disableMultiSort: true,
          disableSortRemove: false,
          autoResetSortBy: false,
        }
      : {}),
    ...(paginationEnabled ? { manualPagination: true, pageCount: pagination.pageCount } : {}),
  };

  // Create the table instance.
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState,
      ...extraTableOptions,
    },
    useFlexLayout,
    ...plugins,
  );

  const {
    // Basic instance props
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    // Sorting specific props
    // Pagination specific props
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    setPageSize,
    // Instance state
    state: { pageIndex, pageSize, sortBy },
  } = tableInstance;

  // If the 'usePagination' plugin is enabled, the 'page' instance prop contains the table rows for the current page.
  // Otherwise, the 'rows' instance prop contains the table rows.
  const tableRows = paginationEnabled ? page : rows;

  useEffect(
    () => {
      if (sortByEnabled) {
        const sortOrder: SortOrder | undefined = sortBy.length
          ? { property: sortBy[0].id, direction: sortBy[0].desc ? 'DESC' : 'ASC' }
          : undefined;
        sorting.onSortByChange(sortOrder);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortBy, sortByEnabled, sorting?.onSortByChange],
  );

  // Since we are using manual controlled pagination, we need to let the controller know
  // any time there is a change to page index or page size.
  useEffect(
    () => {
      if (paginationEnabled) {
        pagination.onPageChange(pageIndex + pagination.basePage);
        pagination.onPageSizeChange(pageSize);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex, pageSize, paginationEnabled, pagination?.onPageChange, pagination?.onPageSizeChange],
  );

  return (
    <div className='d-flex flex-column'>
      <div className='table' {...getTableProps()}>
        <div className='thead'>
          {headerGroups.map(headerGroup => (
            <div className='tr' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <>
                  {sortByEnabled && column.canSort ? (
                    // Add the sorting props to control sorting and sort direction indicator.
                    <div className='th' {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}{' '}
                      <SortIndicator isSorted={column.isSorted} isDesc={column.isSortedDesc} />
                    </div>
                  ) : (
                    <div className='th' {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </div>
                  )}
                </>
              ))}
            </div>
          ))}
        </div>
        <div className='tbody' {...getTableBodyProps()}>
          {tableRows.map(row => {
            prepareRow(row);
            return (
              <div
                className='tr'
                aria-hidden='true'
                onClick={() => {
                  if (onRowClick) onRowClick(row.original);
                }}
                {...row.getRowProps()}
              >
                {row.cells.map(cell => {
                  return (
                    <div className='td' {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {/* If the usePagination plugin is enabled, render a paginator to allow users to page through the data. */}
      {paginationEnabled && (
        <Paginator
          page={pageIndex + pagination.basePage}
          pageSize={pageSize}
          count={pagination.count}
          pageCount={pageCount}
          pageSizeOptions={pagination.pageSizeOptions}
          hasPreviousPage={canPreviousPage}
          hasNextPage={canNextPage}
          onPreviousPageClick={previousPage}
          onNextPageClick={nextPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
};
