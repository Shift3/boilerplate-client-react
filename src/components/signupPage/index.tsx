import { FC } from 'react';
import { ISignupFormData } from 'components/signupForm/types';
import { SignupForm } from '../signupForm';

import { Wrapper } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISignupFormData) => {};

export const SignupPage: FC = () => (
  <Wrapper>
    <SignupForm onSubmit={onSubmit} />
  </Wrapper>
);
