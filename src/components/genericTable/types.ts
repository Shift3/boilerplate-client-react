export type WithId = {
  id: number | string;
};

export type ObjectProperty<ObjectType> = {
  key: keyof ObjectType;
  label: string;
};

export type GenericTableProps<ObjectType> = {
  objects: ObjectType[];
  properties: ObjectProperty<ObjectType>[];
};
