import { FC } from 'react';

export interface ISignUpFormProps {
  // eslint-disable-next-line no-use-before-define
  onSubmit: (data: ISignUpFormData) => void;
}

export interface ISignUpFormData {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
}

export type SignUpFormType = FC<ISignUpFormProps>;
