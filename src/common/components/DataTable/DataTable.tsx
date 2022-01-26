import { ReactElement } from 'react';
import Table from 'react-bootstrap/Table';
import { Column, useTable } from 'react-table';
import { Paginator } from './Paginator';

type DataTableProps<D extends Record<string, unknown>> = {
  columns: Column<D>[];
  data: D[];
  pagination?: {
    page: number;
    pageSize: number;
    count: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    pageSizeOptions: number[];
    getPage: (page: number) => void;
    getPreviousPage: () => void;
    getNextPage: () => void;
    setPageSize: (size: number) => void;
  };
};

export const DataTable = <D extends Record<string, unknown>>({
  columns,
  data,
  pagination,
}: DataTableProps<D>): ReactElement => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data,
  });

  return (
    <div className='shadow p-3 bg-body rounded'>
      {/* apply the table props */}
      <Table {...getTableProps()} responsive hover>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map(row => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </Table>
      {pagination && (
        <Paginator
          page={pagination.page}
          count={pagination.count}
          pageSize={pagination.pageSize}
          pageCount={pagination.pageCount}
          pageSizeOptions={pagination.pageSizeOptions}
          hasPrev={pagination.hasPreviousPage}
          hasNext={pagination.hasNextPage}
          onPrevClick={pagination.getPreviousPage}
          onNextClick={pagination.getNextPage}
          onPageSizeChange={(size: number) => {
            pagination.setPageSize(size);
            pagination.getPage(1);
          }}
        />
      )}
    </div>
  );
};
