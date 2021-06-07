/* eslint-disable jsx-quotes */
import { FC } from 'react';
import { ResetPasswordForm } from '../resetPasswordForm';
import { IResetPasswordFormData } from '../resetPasswordForm/types';
import { ResetPasswordFormContainer, ResetPasswordPageContainer } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: IResetPasswordFormData) => {};

export const ResetPasswordPage: FC = () => (
  <ResetPasswordPageContainer data-testid='rppc'>
    <ResetPasswordFormContainer data-testid='rpfc'>
      <ResetPasswordForm onSubmit={onSubmit} />
    </ResetPasswordFormContainer>
  </ResetPasswordPageContainer>
);
