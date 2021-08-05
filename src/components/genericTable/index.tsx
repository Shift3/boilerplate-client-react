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

export const GenericTable = <TableItem extends BaseTableItem>(props: GenericTableProps<TableItem>): ReactElement => {
  const { items, headers } = props;

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
              {headers.map((header) => (
                <td key={String(header.key)}>{item[header.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {!items.length && <div className='text-center'>No data</div>}
    </>
  );
};
