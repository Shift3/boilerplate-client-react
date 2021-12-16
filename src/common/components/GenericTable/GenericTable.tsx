import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';
import { StyledTable } from './styles';
import { BaseTableItem, GenericTableProps } from './types';

export const GenericTable = <TableItem extends BaseTableItem>({
  headers,
  items,
  onRowClick,
  customRenderers = [],
}: GenericTableProps<TableItem>): ReactElement => {
  return (
    <>
      <StyledTable responsive>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={String(header.key)}>{header.label} {header.label ? <FontAwesomeIcon icon={['fas', 'sort']} /> : null}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} onClick={() => {
              if (onRowClick)
                onRowClick(item)
              }
            }>
              {headers.map((header) => {
                const customRenderer = customRenderers.find((cr) => cr.key === header.key);
                return (
                  <td key={String(header.key)}>{customRenderer ? customRenderer.renderer(item) : item[header.key]}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </StyledTable>

      {!items.length && <div className='text-center'>No data</div>}
    </>
  );
};
