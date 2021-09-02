import { ReactNode } from 'react';

export type BaseTableItem = {
  id: number | string;
};

export type TableHeader<TableItem> = { key: keyof TableItem; label: string };

export type CustomRenderer<TableItem extends BaseTableItem> = {
  key: keyof TableItem;
  renderer: (item: TableItem) => ReactNode;
};

export type GenericTableProps<TableItem extends BaseTableItem> = {
  headers: TableHeader<TableItem>[];
  items: TableItem[];
  customRenderers?: CustomRenderer<TableItem>[];
};