import { FC } from 'react';

export interface ISignupFormData {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
}

export interface ISignupFormProps {
  onSubmit: (data: ISignupFormData) => void;
}

export type SignupFormType = FC<ISignupFormProps>;
