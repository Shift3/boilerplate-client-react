import React from 'react';

export type BaseTableItem = {
  id: number | string;
};

export type TableHeader<TableItem> = {
  key: keyof TableItem;
  label: string;
};

export type CustomRenderer<TableItem> = (item: TableItem) => React.ReactNode;

export type GenericTableProps<TableItem extends BaseTableItem> = {
  items: TableItem[];
  headers: TableHeader<TableItem>[];
  customRenderers: Partial<Record<keyof TableItem, CustomRenderer<TableItem>>>;
};
