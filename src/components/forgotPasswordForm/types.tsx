import { FC } from 'react';

export interface IForgotPassswordFormData {
  email: string;
}

type IForgotPasswordFormProps = {
  onSubmit: (data: IForgotPassswordFormData ) => void;
  onCancel: () => void;
}

export type ForgotPasswordFormType = FC<IForgotPasswordFormProps>;
