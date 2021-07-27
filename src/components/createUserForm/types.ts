import { FC } from 'react';

export interface ICreateUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
export interface ICreateUserFormProps {
  onSubmit: (data: ICreateUserFormData) => void;
  onCancel: () => void;
}

export type CreateUserFormType = FC<ICreateUserFormProps>;