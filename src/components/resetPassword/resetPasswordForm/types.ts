import { FC } from 'react';

export interface IResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

type ISetPasswordFormProps = {
  onSubmit: (data: IResetPasswordFormData) => void;
};

export type ResetPasswordFormType = FC<ISetPasswordFormProps>;
