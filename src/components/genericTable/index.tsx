import { ReactElement } from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { BaseTableItem, GenericTableProps } from './types';

const StyledTable = styled(Table)`
  thead {
    background-color: ${(props) => props.theme.primary};
    color: white;
  }

  th {
    border-top: 0;
  }

  th:nth-child(1) {
    border-radius: 15px 0px 0px 0px;
  }

  th:nth-last-child(1) {
    border-radius: 0px 15px 0px 0px;
  }

  tbody > tr {
    background: white;
  }

  td {
    color: ${(props) => props.theme.primary};
  }
`;

export const GenericTable = <TableItem extends BaseTableItem>({
  items,
  headers,
  customRenderers = {},
}: GenericTableProps<TableItem>): ReactElement => {
  return (
    <>
      <StyledTable responsive>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={String(header.key)}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {headers.map((header) => {
                // If the item has a custom render function for the header, use the render function.
                // Otherwise, just render the value.
                const customRenderer = customRenderers[header.key];
                return <td key={String(header.key)}>{customRenderer ? customRenderer(item) : item[header.key]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {!items.length && <div className='text-center'>No data</div>}
    </>
  );
};
