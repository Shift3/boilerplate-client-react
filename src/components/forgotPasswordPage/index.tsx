import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ForgotPasswordForm } from '../forgotPasswordForm';
import { IForgotPassswordFormData } from 'components/forgotPasswordForm/types';
import { Wrapper } from './styled';

export const ForgotPasswordPage: FC = () => {
  const history = useHistory();

  // TODO: we need to make an API call and handle
  // success and error cases.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (formData: IForgotPassswordFormData) => {
    history.push('/');
  };

  const onCancel = () => {
    history.push('/');
  };

  return (
    <Wrapper data-testid='wrapper'>
      <ForgotPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};
