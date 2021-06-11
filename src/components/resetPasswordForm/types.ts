import { FC } from 'react';

export interface IResetPasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type IResetPasswordFormProps = {
  onSubmit: (data: IResetPasswordFormData) => void;
};

export type ResetPasswordFormType = FC<IResetPasswordFormProps>;
