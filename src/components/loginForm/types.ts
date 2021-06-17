import { FC } from 'react';

export interface ILogInFormData {
  email: string;
  password: string;
}

export interface ILogInFormProps {
  onSubmit: (data: ILogInFormData) => void;
  onCancel: (data: ILogInFormData) => void;
}

export type LogInFormType = FC<ILogInFormProps>;
