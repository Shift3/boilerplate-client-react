import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ChangePasswordForm } from '../changePasswordForm';
import { IChangePasswordFormData } from '../changePasswordForm/types';
import { Wrapper } from './styled';

export const ChangePasswordPage: FC = () => {
  const history = useHistory();

  //  eslint-disable-next-line
  const onSubmit = (formData: IChangePasswordFormData) => {
    // TODO: make API call to handle success and error cases.
    history.push('/');
  };

  return (
    <Wrapper data-testid='wrapper'>
      <ChangePasswordForm onSubmit={onSubmit} />
    </Wrapper>
  );
};
