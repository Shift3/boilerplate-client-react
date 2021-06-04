import { FC } from 'react';
import { SetPasswordForm } from '../setPasswordForm';
import { ISetPasswordFormData } from '../setPasswordForm/types';
import { ResetPasswordFormContainer, ResetPasswordPageContainer } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISetPasswordFormData) => {};

export const ResetPasswordPage: FC = () => (
  <ResetPasswordPageContainer data-testid="rppc">
    <ResetPasswordFormContainer data-testid="rpfc">
      <SetPasswordForm onSubmit={onSubmit} />
    </ResetPasswordFormContainer>
  </ResetPasswordPageContainer>
);