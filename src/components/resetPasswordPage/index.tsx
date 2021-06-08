import { FC } from 'react';
import { SetPasswordForm } from '../setPasswordForm';
import { ISetPasswordFormData } from '../setPasswordForm/types';
import { ResetPasswordFormContainer, ResetPasswordPageContainer } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISetPasswordFormData) => {};

export const ResetPasswordPage: FC = () => (
  <ResetPasswordPageContainer data-testid="resetPasswordPageContainer">
    <ResetPasswordFormContainer data-testid="resetPasswordFormContainer">
      <SetPasswordForm onSubmit={onSubmit} />
    </ResetPasswordFormContainer>
  </ResetPasswordPageContainer>
);