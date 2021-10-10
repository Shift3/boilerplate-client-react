import { FC } from 'react';

export interface IResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

type IResetPasswordFormProps = {
  onSubmit: (data: IResetPasswordFormData) => void;
  onCancel: () => void;
};

export type ResetPasswordFormType = FC<IResetPasswordFormProps>;
