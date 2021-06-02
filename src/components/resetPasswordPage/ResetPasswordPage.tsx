import { FC } from 'react';
import { SetPasswordForm } from '../setPasswordForm';
import { ISetPasswordFormData } from '../setPasswordForm/types';
import { Wrapper } from './styled';

//  eslint-disable-next-line
const onSubmit = (formData: ISetPasswordFormData) => {};

export const ResetPasswordPage: FC = () => (
  <Wrapper>
    <SetPasswordForm onSubmit={onSubmit} />;
  </Wrapper>
);
