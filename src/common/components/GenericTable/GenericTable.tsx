import { ReactElement, ReactNode } from 'react';
import Table from 'react-bootstrap/Table';

export type BaseDataType = {
  id: number | string;
};

export type TableHeader<DataType> = { key: keyof DataType; label: string };

export type CustomRenderer<DataType> = { key: keyof DataType; renderer: (item: DataType) => ReactNode };

export type Props<DataType> = {
  headers: TableHeader<DataType>[];
  items: DataType[];
  customRenderers?: CustomRenderer<DataType>[];
};

export const GenericTable = <DataType extends BaseDataType>({
  headers,
  items,
  customRenderers = [],
}: Props<DataType>): ReactElement => {
  return (
    <Table responsive>
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
    </Table>
  );
};
