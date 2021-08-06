import { FC } from 'react';

export interface IChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type IChangePasswordFormProps = {
  onSubmit: (data: IChangePasswordFormData) => void;
};

export type ChangePasswordFormType = FC<IChangePasswordFormProps>;
