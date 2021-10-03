import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import {
  ButtonWrapper,
  CreateAccountButton,
  CancelButton,
  InputError,
  FormLabel,
  LogInButton,
  StyledForm,
  Title,
  LinkWrapper,
  Login,
  Register,
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
        <Title>
          <h2 data-testid='loginPageInfoHeading'>Not Registered Yet?</h2>
        </Title>
      </Login>
      <Register>
        <Text>
          <p data-testid='loginPageInfoContent'>Registering for your account is quick and easy.</p>
        </Text>
        <CreateAccountButton data-testid='createAccountButton' onClick={navigateToSignup}>
          CREATE ACCOUNT
        </CreateAccountButton>
        <LinkWrapper>
          <Link to='/auth/forgot-password'>Forgot Password?</Link>
        </LinkWrapper>
      </Register>
    </StyledForm>
  );
};
