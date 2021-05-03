import { FC } from 'react';
import { SignupForm } from '../signupForm';
import { ISignupFormData } from '../signupForm/types';

const onSubmit = (formData: ISignupFormData) => {
    //  eslint-disable-next-line
    console.log("SignupFormData: ", formData);
}

export const SignupPage: FC = () => (
    <>
        <SignupForm  onSubmit={onSubmit}/>
    </>
)
