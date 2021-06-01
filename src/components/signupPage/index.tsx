import { FC } from 'react';
import { SignUpForm } from '../signUpForm';
import { ISignUpFormData } from '../signUpForm/types';
import { Wrapper } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISignUpFormData) => {};

export const SignUpPage: FC = () => (
  <Wrapper>
    <SignUpForm onSubmit={onSubmit} />
  </Wrapper>
);
