import { ReactNode } from 'react';

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