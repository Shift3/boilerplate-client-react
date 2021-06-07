import { FC } from 'react';
import { SignUpForm } from '../signUpForm';
import { ISignUpFormData } from '../signUpForm/types';
import { SignupPageContainer, SignupFormContainer } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISignUpFormData) => {};

export const SignUpPage: FC = () => (
  <SignupPageContainer>
    <SignupFormContainer>
      <SignUpForm onSubmit={onSubmit} />
    </SignupFormContainer>
  </SignupPageContainer>
);
