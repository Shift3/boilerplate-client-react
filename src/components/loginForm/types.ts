import { FC } from 'react';

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ILogInFormProps {
  onSubmit: (data: ILogInFormData) => void;
  onCancel: () => void;
}

export type LogInFormType = FC<ILogInFormProps>;
