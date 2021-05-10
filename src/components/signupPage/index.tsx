import { FC } from 'react';
import { SignupForm } from '../signupForm';
import { ISignupFormData } from '../signupForm/types';

//  eslint-disable-next-line
const onSubmit = (formData: ISignupFormData) => {
}

export const SignupPage: FC = () => (
    <>
        <SignupForm  onSubmit={onSubmit}/>
    </>
)
