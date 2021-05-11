import { FC } from 'react';
import { SetPasswordForm } from '../setPasswordForm';
import { ISetPasswordFormData } from '../setPasswordForm/types';

//  eslint-disable-next-line
const onSubmit = (formData: ISetPasswordFormData) => {};

export const ResetPasswordPage: FC = () => <SetPasswordForm onSubmit={onSubmit} />;
