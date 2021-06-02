import { FC } from 'react';
import { SignupForm } from '../signupForm';
import { ISignupFormData } from '../signupForm/types';
import { SignupPageContainer, SignupFormContainer } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISignupFormData) => {};

export const SignupPage: FC = () => (
  <SignupPageContainer data-testid="signupPageContainer">
    <SignupFormContainer data-testid="signupFormContainer">
      <SignupForm  onSubmit={onSubmit}/>
    </SignupFormContainer>
  </SignupPageContainer>
);
