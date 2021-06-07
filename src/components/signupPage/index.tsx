import { FC } from 'react';
import { ISignUpFormData } from 'components/signUpForm/types';
import { SignupForm } from '../signUpForm';
import { Wrapper } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISignUpFormData) => {};

export const SignUpPage: FC = () => (
  <Wrapper>
    <SignupForm onSubmit={onSubmit} />
  </Wrapper>
);
