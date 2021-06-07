import { FC } from 'react';
import { ISignupFormData } from 'components/signUpForm/types';
import { SignupForm } from '../signUpForm';
import { Wrapper } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISignupFormData) => {};

export const SignUpPage: FC = () => (
  <Wrapper>
    <SignupForm onSubmit={onSubmit} />
  </Wrapper>
);
