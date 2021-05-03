import { FC } from 'react'
import { SetPasswordForm } from '../setPasswordForm';
import { ISetPasswordFormData } from '../setPasswordForm/types';

const onSubmit = (formData: ISetPasswordFormData) => {
    // eslint-disable-next-line
    console.log("setPasswordFormData", formData);
}

export const ResetPasswordPage: FC = () => (
    <SetPasswordForm onSubmit={onSubmit}/>
)
