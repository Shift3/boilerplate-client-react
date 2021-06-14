import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ResetPasswordForm } from '../resetPasswordForm';
import { IResetPasswordFormData } from '../resetPasswordForm/types';
import { Wrapper } from './styled';

export const ResetPasswordPage: FC = () => {
  const history = useHistory();

  //  eslint-disable-next-line
  const onSubmit = (formData: IResetPasswordFormData) => {

  };

  return (
    <Wrapper data-testid='wrapper'>
      <ResetPasswordForm onSubmit={onSubmit} />
    </Wrapper>
  );
};
