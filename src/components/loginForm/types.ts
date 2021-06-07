import { FC } from 'react';

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  onSubmit: (data: ILoginFormData) => void;
}

export type LoginFormType = FC<ILoginFormProps>;
