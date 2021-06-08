/* eslint-disable lines-around-comment */
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ResetPasswordForm } from '../resetPasswordForm';
import { IResetPasswordFormData } from '../resetPasswordForm/types';
import { Wrapper } from './styled';

export const ResetPasswordPage: FC = () => {
  const history = useHistory();

  //  eslint-disable-next-line
  const onSubmit = (formData: IResetPasswordFormData) => {
    // TODO: make API call to handle success and error cases.
    history.push('/');
  };

  const onCancel = () => {
    history.push('/');
  };

  return (
    <Wrapper>
      <ResetPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};
