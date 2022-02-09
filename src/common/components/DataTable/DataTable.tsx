import { ReactElement, useEffect } from 'react';
import { Column, useFilters, useFlexLayout, usePagination, useSortBy, useTable } from 'react-table';
import { Paginator } from './Paginator';

export type DataTableProps<D extends Record<string, unknown>> = {
  columns: Column<D>[];
  onRowClick?: (item: D) => void;
  data: D[];
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
  sortBy?: {
    // TODO
  };
  filters?: {
    // TODO
  };
};

export const DataTable = <D extends Record<string, unknown>>({
  columns,
  data,
  pagination,
  sortBy,
  onRowClick,
  filters,
}: DataTableProps<D>): ReactElement => {
  // Evaluate these conditions once instead of re-computing in multiple places.
  const filtersEnabled = filters !== undefined;
  const sortByEnabled = sortBy !== undefined;
  const paginationEnabled = pagination !== undefined;

  // Determine which react-table plugins should be enabled.
  const plugins = [
    // The order in which plugins are specified matters to react-table.
    // Order needs to be useFilter -> useSortBy -> usePagination.
    ...(filtersEnabled ? [useFilters] : []),
    ...(sortByEnabled ? [useSortBy] : []),
    ...(paginationEnabled ? [usePagination] : []),
  ];

  // Generate the required initial state for the enabled plugins.
  const initialState = {
    ...(filtersEnabled ? {} : {}), // TODO: add initial state for filtering
    ...(sortByEnabled ? {} : {}), // TODO: add initial state for sorting
    ...(paginationEnabled ? { pageIndex: 0, pageSize: pagination.pageSize } : {}),
  };

  // Generate the required table options for the enabled plugins.
  const extraTableOptions = {
    ...(filtersEnabled ? {} : {}), // TODO: add table options for filtering
    ...(sortByEnabled ? {} : {}), // TODO: add table options for sorting
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
    // Pagination specific props
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    setPageSize,
    // Instance state
    state: { pageIndex, pageSize },
  } = tableInstance;

  // If the 'usePagination' plugin is enabled, the 'page' instance prop contains the table rows for the current page.
  // Otherwise, the 'rows' instance prop contains the table rows.
  const tableRows = paginationEnabled ? page : rows;

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
    <div>
      <div className="table" {...getTableProps()}>
        <div className="thead">
          {headerGroups.map(headerGroup => (
            <div className="tr" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <div className="th" {...column.getHeaderProps()}>{column.render('Header')}</div>
              ))}
            </div>
          ))}
        </div>

        <div className="tbody" {...getTableBodyProps()}>
          {tableRows.map(row => {
            prepareRow(row);
            return (
              <div className="tr" aria-hidden="true" onClick={() => {
                if (onRowClick)
                  onRowClick(row.original);
                }}{...row.getRowProps()}
              >
                {row.cells.map(cell => {
                  return <div className="td" {...cell.getCellProps()}>{cell.render('Cell')}</div>;
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
