import { FC } from 'react';

export type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const VisibleOptionsSelector: FC<Props> = ({ value, onChange }) => {
  return <span>Hello World</span>;
};
