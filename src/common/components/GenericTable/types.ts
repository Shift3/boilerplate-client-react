import { ReactNode } from 'react';

export type BaseTableItem = {
  id: number | string;
};

export type TableHeader<TableItem extends BaseTableItem> = {
  key: keyof TableItem;
  label: string;
};

export type CustomRenderers<TableItem extends BaseTableItem> = Partial<
  Record<keyof TableItem, (item: TableItem) => ReactNode>
>;

export type GenericTableProps<TableItem extends BaseTableItem> ={
  headers: TableHeader<TableItem>[];
  items: TableItem[];
  customRenderers?: CustomRenderers<TableItem>[];
};