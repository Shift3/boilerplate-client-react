/* eslint-disable jsx-quotes */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { ButtonWrapper, CancelButton, InputError, FormLabel, LogInButton, StyledForm, Title } from './styled';
import { LogInFormSchema } from './schema';
import { LogInFormType } from './types';

export const LogInForm: LogInFormType = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(LogInFormSchema),
    mode: 'onChange',
  });

  return (
    <>
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
          <LogInButton data-testid='submitButton' type='submit' disabled={!isValid}>
            LOG IN
          </LogInButton>
        </ButtonWrapper>
      </StyledForm>
    </>
  );
};
