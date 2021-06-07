import { FC } from 'react';

export interface ILogInFormData {
  email: string;
  password: string;
}

export interface ILogInFormProps {
  onSubmit: (data: ILogInFormData) => void;
  onCancel: () => void;
}

export type LogInFormType = FC<ILogInFormProps>;
