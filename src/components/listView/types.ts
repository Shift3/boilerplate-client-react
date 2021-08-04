export type ObjectProperty<ObjectType> = {
  key: keyof ObjectType;
  label: string;
};

export type ListViewProps<ObjectType> = {
  objects: ObjectType[];
  properties: ObjectProperty<ObjectType>[];
};

export type WithId = {
  id: number | string;
};
