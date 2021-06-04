import { FC } from 'react';
import { ResetPasswordForm } from '../resetPasswordForm/index';
import { IResetPasswordFormData } from '../resetPasswordForm/types';
import { Wrapper } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: IResetPasswordFormData) => {};

export const ResetPasswordPage: FC = () => (
  <Wrapper>
    <ResetPasswordForm onSubmit={onSubmit} />;
  </Wrapper>
);
