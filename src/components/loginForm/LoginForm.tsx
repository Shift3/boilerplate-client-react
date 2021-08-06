import { useForm } from 'react-hook-form';
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { LoginFormSchema } from './schema';
import { LoginFormProps } from './types';
import {
  StyledForm,
  Title,
  FormLabel,
  InputError,
  ButtonWrapper,
  CancelButton,
  SubmitButton,
} from '../../styles/components/Forms';

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(LoginFormSchema),
    mode: 'onChange',
  });

  return (
    <StyledForm data-testid='loginForm' onSubmit={handleSubmit(onSubmit)}>
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
        <SubmitButton data-testid='submitButton' type='submit' disabled={!isValid}>
          LOG IN
        </SubmitButton>
      </ButtonWrapper>
    </StyledForm>
  );
};
