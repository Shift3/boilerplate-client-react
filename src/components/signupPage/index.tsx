/* eslint-disable lines-around-comment */
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ISignUpFormData } from 'components/signupForm/types';
import { SignUpForm } from 'components/signupForm';
import { Wrapper } from './styled';

export const SignUpPage: FC = () => {
  const history = useHistory();

  //  eslint-disable-next-line
  const onSubmit = (formData: ISignUpFormData) => {
    // TODO: we need to actually make an API call and handle
    // success and error cases.
    history.push('/');
  };

  const onCancel = () => {
    history.push('/');
  };

  return (
    <Wrapper data-testid="wrapper">
      <SignUpForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};
