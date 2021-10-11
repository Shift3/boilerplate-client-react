import { FC } from 'react';

export interface IActivateAccountFormData {
  newPassword: string;
  confirmPassword: string;
}

type IActivateAccountFormProps = {
  onSubmit: (data: IActivateAccountFormData) => void;
  onCancel: () => void;
};

export type ActivateAccountFormType = FC<IActivateAccountFormProps>;
