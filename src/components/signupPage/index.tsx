import { FC } from 'react';
import { SignupForm } from '../signupForm';
import { ISignupFormData } from '../signupForm/types';
import { Wrapper } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISignupFormData) => {};

export const SignupPage: FC = () => (
  <Wrapper>
    <SignupForm onSubmit={onSubmit} />
  </Wrapper>
);
