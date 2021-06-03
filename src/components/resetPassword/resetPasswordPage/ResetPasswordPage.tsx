import { FC } from 'react';
import { SetPasswordForm } from '../resetPasswordForm';
import { ISetPasswordFormData } from '../resetPasswordForm/types';
import { Wrapper } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISetPasswordFormData) => {};

export const ResetPasswordPage: FC = () => (
  <Wrapper>
    <SetPasswordForm onSubmit={onSubmit} />;
  </Wrapper>
);
