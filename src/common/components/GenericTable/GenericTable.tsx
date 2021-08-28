import { ReactElement } from 'react';
import { StyledTable } from './styles';
import { BaseDataType, Props } from './types';

export const GenericTable = <DataType extends BaseDataType>({
  headers,
  items,
  customRenderers = [],
}: Props<DataType>): ReactElement => {
  return (
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
              const customRenderer = customRenderers.find((cr) => cr.key === header.key);
              return (
                <td key={String(header.key)}>{customRenderer ? customRenderer.renderer(item) : item[header.key]} </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};
