import { FC } from 'react';

export interface ISignupFormProps {
  // eslint-disable-next-line no-use-before-define
  onSubmit: (data: ISignupFormData) => void;
}

export interface ISignupFormData {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
}

export type SignupFormType = FC<ISignupFormProps>;
