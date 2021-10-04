import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import {
  ButtonWrapper,
  CreateAccountButton,
  CancelButton,
  ForgotPassword,
  FormLabel,
  InputError,
  Login,
  LogInButton,
  Register,
  StyledForm,
  Title,
  Text,
} from './styled';
import { LogInFormSchema } from './schema';
import { LogInFormType } from './types';
import { Link, useHistory } from 'react-router-dom';

export const LogInForm: LogInFormType = ({ onSubmit, onCancel }) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(LogInFormSchema),
    mode: 'onChange',
  });

  const navigateToSignup = () => history.push('/auth/signup');

  return (
    <StyledForm data-testid='loginForm' onSubmit={handleSubmit(onSubmit)}>
      <Login>
        <Title>Member Log In</Title>
        <Form.Group>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Form.Control id='email' type='email' {...register('email')} placeholder='Enter email' />
          {errors.email?.message && <InputError role='alert'>{errors.email?.message}</InputError>}
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Form.Control id='password' type='password' {...register('password')} placeholder='Enter password' />
          {errors.password?.message && <InputError role='alert'>{errors.password?.message}</InputError>}
        </Form.Group>
        <ButtonWrapper>
          <CancelButton data-testid='cancelButton' onClick={onCancel}>
            CANCEL
          </CancelButton>
          <LogInButton data-testid='submitButton' type='submit' disabled={!isValid}>
            LOG IN
          </LogInButton>
        </ButtonWrapper>
        <ForgotPassword>
          <Link to='/auth/forgot-password'>Forgot Password?</Link>
        </ForgotPassword>
      </Login>
      <Register>
        <Title data-testid='loginPageInfoHeading'>Need to Register?</Title>
        <Text>
          <p data-testid='loginPageInfoContent'>Registering for your account is quick and easy.</p>
        </Text>
        <CreateAccountButton data-testid='createAccountButton' onClick={navigateToSignup}>
          CREATE ACCOUNT
        </CreateAccountButton>
      </Register>
    </StyledForm>
  );
};
