import { FC } from 'react';

export interface ISignUpFormData {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
}
export interface ISignUpFormProps {
  onSubmit: (data: ISignUpFormData) => void;
  onCancel: () => void;
}

export type SignUpFormType = FC<ISignUpFormProps>;