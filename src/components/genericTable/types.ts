export type BaseTableItem = {
  id: number | string;
};

export type TableHeader<TableItem> = {
  key: keyof TableItem;
  label: string;
};

export type GenericTableProps<TableItem extends BaseTableItem> = {
  items: TableItem[];
  headers: TableHeader<TableItem>[];
};
