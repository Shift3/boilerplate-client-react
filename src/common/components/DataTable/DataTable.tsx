import { ReactElement, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Column, useFilters, usePagination, useSortBy, useTable } from 'react-table';
import { Paginator } from './Paginator';

export type DataTableProps<D extends Record<string, unknown>> = {
  columns: Column<D>[];
  data: D[];
  pagination?: {
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
  filters,
}: DataTableProps<D>): ReactElement => {
  // Evaluate these conditions once instead of re-computing in multiple places.
  const useFiltersPlugin = filters !== undefined;
  const useSortByPlugin = sortBy !== undefined;
  const usePaginationPlugin = pagination !== undefined;

  // Determine which react-table plugins should be enabled.
  const plugins = [
    // The order in which plugins are specified matters to react-table.
    // Order needs to be useFilter -> useSortBy -> usePagination.
    ...(useFiltersPlugin ? [useFilters] : []),
    ...(useSortByPlugin ? [useSortBy] : []),
    ...(usePaginationPlugin ? [usePagination] : []),
  ];

  // Generate the required initial state for the enabled plugins.
  const initialState = {
    ...(useFiltersPlugin ? {} : {}), // TODO: add initial state for filtering
    ...(useSortByPlugin ? {} : {}), // TODO: add initial state for sorting
    ...(usePaginationPlugin ? { pageIndex: pagination.page, pageSize: pagination.pageSize } : {}),
  };

  // Generate the required table options for the enabled plugins.
  const extraTableOptions = {
    ...(useFiltersPlugin ? {} : {}), // TODO: add table options for filtering
    ...(useSortByPlugin ? {} : {}), // TODO: add table options for sorting
    ...(usePaginationPlugin ? { manualPagination: true, pageCount: pagination.pageCount } : {}),
  };

  // Create the table instance.
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState,
      ...extraTableOptions,
    },
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
  const tableRows = usePaginationPlugin ? page : rows;

  // Since we are using manual controlled pagination, we need to let the controller know
  // any time there is a change to page index or page size.
  useEffect(
    () => {
      if (usePaginationPlugin) {
        pagination.onPageChange(pageIndex + 1);
        pagination.onPageSizeChange(pageSize);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex, pageSize, usePaginationPlugin, pagination?.onPageChange, pagination?.onPageSizeChange],
  );

  return (
    <div className='shadow p-3 bg-body rounded'>
      <Table {...getTableProps()} responsive hover>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {tableRows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* If the usePagination plugin is enabled, render a paginator to allow users to page through the data. */}
      {usePaginationPlugin && (
        <Paginator
          page={pageIndex + 1}
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
