import { ISignupFormData } from 'components/signUpForm/types';
import { FC } from 'react';
import { SignupForm } from '../signupForm';
import { Wrapper } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISignupFormData) => {};

export const SignUpPage: FC = () => (
  <Wrapper>
    <SignupForm onSubmit={onSubmit} />
  </Wrapper>
);
