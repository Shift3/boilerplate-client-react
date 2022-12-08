import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SortOrder } from 'common/models/sorting';
import { TableActionsStyling } from 'common/styles/button';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Button, Dropdown, Modal, Table } from 'react-bootstrap';
import { Column, useFlexLayout, usePagination, useSortBy, useTable } from 'react-table';
import { CustomToggle } from '../CustomToggle';
import { Paginator } from './Paginator';
import { SortIndicator } from './SortIndicator';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useViewport } from './Responsiveness/hooks/useViewport';
import { isKeyOfObject } from 'common/error/utilities';
import { useModal } from 'react-modal-hook';
import styled from 'styled-components';
import { ColumnBreakpoints } from './Responsiveness/models/ColumnBreakpoints';

const OverrideTableStyling = styled.div`
  padding: 0px !important;
`;

const TableModalStyling = styled.div`
  padding: 0px;

  & > div > table {
    color: ${props => props.theme.textColor};
  }
`;

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
  initialColumnBreakpointVisibility: ColumnBreakpoints;
};

export const DataTable = <D extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  pagination,
  sorting,
  initialColumnBreakpointVisibility,
}: DataTableProps<D>): ReactElement => {
  const { breakpoint } = useViewport();
  const [columnVisibility, setColumnVisibility] = useState(initialColumnBreakpointVisibility);

  const identifyHiddenColumns = useCallback(() => {
    const hiddenColumns: string[] = [];

    Object.entries(columnVisibility).forEach(([key, value]) => {
      if (isKeyOfObject(breakpoint, value) && !value[breakpoint]) {
        hiddenColumns.push(key);
      }
    });

    return hiddenColumns;
  }, [breakpoint, columnVisibility]);

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
    hiddenColumns: identifyHiddenColumns(),
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
      stateReducer: (newState, action) => {
        switch (action.type) {
          case 'filter or search was used':
            return {
              ...newState,
              pageIndex: 0,
            };
          default:
            return newState;
        }
      },
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
    dispatch,
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

  // When switching between pages via the Paginator, the table's pageIndex will always be 1 less than pagination.page.
  // However, if the user uses search or a filter, then pagination.page will be less than or equal to the pageIndex.
  // In this case, we need to reset the table's pageIndex to 0. This will cause the pagination numbering and next/previous
  // buttons to be updated and the result will be consistent with the current data set.
  useEffect(() => {
    if (pagination) {
      if (pagination.page <= pageIndex) {
        dispatch({ type: 'filter or search was used' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination?.page]);

  useEffect(() => {
    tableInstance.setHiddenColumns(identifyHiddenColumns());
  }, [breakpoint, tableInstance, identifyHiddenColumns]);

  const getHeaderForColumn = (colName: string) => {
    let result = '';

    columns.forEach(col => {
      const colAccessor = col.accessor;

      if (typeof colAccessor === 'string') {
        if (colAccessor === colName) {
          if (typeof col.Header === 'string') {
            if (colAccessor === 'actions') {
              result = 'Actions';
            } else {
              result = col.Header;
            }
          }
        }
      }
    });
    return result;
  };

  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => {
      return (
        <Modal show={open} onHide={hideModal} onExited={onExited} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Columns (for screen size)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TableModalStyling>
              <Table bordered responsive className='mb-0'>
                <thead>
                  <tr>
                    {['Columns', 'Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'Extra Extra Large'].map(
                      col => (
                        <th className='text-nowrap text-center'>{col}</th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(columnVisibility).map(([col, breakpoints]) => (
                    <tr key={col}>
                      <td className='text-center align-middle'>{getHeaderForColumn(col)}</td>
                      {Object.entries(breakpoints).map(([breakpoint, visibility]) => (
                        <td key={breakpoint} className='text-center align-middle'>
                          <Button
                            onClick={() =>
                              setColumnVisibility({
                                ...columnVisibility,
                                [col]: { ...breakpoints, [breakpoint]: !visibility },
                              })
                            }
                          >
                            {visibility === true ? 'Show' : 'Hide'}
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableModalStyling>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-end mt-0'>
            <Button variant='link' onClick={hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    },
    [columnVisibility],
  );

  return (
    <div className='d-flex flex-column'>
      <div className='table' {...getTableProps()}>
        <div className='thead d-flex justify-content-between align-items-center'>
          {headerGroups.map(headerGroup => (
            <div className='tr' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <React.Fragment key={column.id}>
                  {sortByEnabled && column.canSort ? (
                    // Add the sorting props to control sorting and sort direction indicator.
                    <div className='th' {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}{' '}
                      <SortIndicator key={headerGroup.id} isSorted={column.isSorted} isDesc={column.isSortedDesc} />
                    </div>
                  ) : (
                    <div className='th d-none' {...column.getHeaderProps()} key={headerGroup.id}>
                      {column.render('Header')}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
          <Dropdown onClick={e => e.stopPropagation()}>
            <Dropdown.Toggle as={CustomToggle} id='dropdown-basic'>
              <TableActionsStyling>
                <FontAwesomeIcon icon={faEllipsisV} size='xs' />
              </TableActionsStyling>
            </Dropdown.Toggle>
            <OverrideTableStyling>
              <Dropdown.Menu className='p-0'>
                <Dropdown.Item className='rounded' onClick={() => showModal()}>
                  Edit Columns
                </Dropdown.Item>
              </Dropdown.Menu>
            </OverrideTableStyling>
          </Dropdown>
        </div>
        <div className='tbody' {...getTableBodyProps()}>
          {tableRows.length === 0 ? <p className='text-muted mt-3 px-4'>No Results...</p> : null}
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
