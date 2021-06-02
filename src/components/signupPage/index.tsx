import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ISignupFormData } from 'components/signupForm/types';
import { SignupForm } from '../signupForm';
import { Wrapper } from './styled';

export const SignupPage: FC = () => {
  const history = useHistory();

  //  eslint-disable-next-line
  const onSubmit = (formData: ISignupFormData) => {
    // TODO: we need to actually make an API call and handle
    // success and error cases.
    history.push('/');
  };

  const onCancel = () => {
    history.push('/');
  };

  return (
    <Wrapper>
      <SignupForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};
