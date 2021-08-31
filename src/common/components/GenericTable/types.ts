import { ReactNode } from 'react';

export type BaseTableItem = {
  id: number | string;
};
export type TableHeader<TableItem> = { key: keyof TableItem; label: string };

export type CustomRenderer<TableItem> = { key: keyof TableItem; renderer: (item: TableItem) => ReactNode };

export type GenericTableProps<TableItem> = {
  headers: TableHeader<TableItem>[];
  items: TableItem[];
  customRenderers?: CustomRenderer<TableItem>[];
};