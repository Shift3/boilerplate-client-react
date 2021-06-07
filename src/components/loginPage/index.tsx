import { LogInForm } from 'components/logInForm';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ILogInFormData } from '../logInForm/types';
import { Wrapper } from './styled';

export const LogInPage: FC = () => {
  const history = useHistory();

  // TODO: we need to actually make an API call and handle
  // success and error cases.
  history.push('/');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (formData: ILogInFormData) => {
    history.push('/');
  };

  const onCancel = () => {
    history.push('/');
  };

  return (
    <Wrapper>
      <LogInForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};
