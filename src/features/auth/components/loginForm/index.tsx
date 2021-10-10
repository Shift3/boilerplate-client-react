import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import { ButtonWrapper, CancelButton, FormLabel, FormControl, LogInButton } from './styled';
import { LogInFormSchema } from './schema';
import { ILogInFormProps } from './types';

export const LogInForm: FC<ILogInFormProps> = ({
  cancelButtonLabel = 'CANCEL',
  submitButtonLabel = 'SUBMIT',
  onCancel,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(LogInFormSchema),
    mode: 'onChange',
  });

  return (
    <Form data-testid='loginForm' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <FormControl id='email' type='email' {...register('email')} placeholder='Enter email' />
        <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Form.Control id='password' type='password' {...register('password')} placeholder='Enter password' />
        <Form.Control.Feedback type='invalid'>{errors.password?.message}</Form.Control.Feedback>
      </Form.Group>
      <ButtonWrapper>
        <CancelButton data-testid='cancelButton' onClick={onCancel}>
          {cancelButtonLabel}
        </CancelButton>
        <LogInButton data-testid='submitButton' type='submit' disabled={!isValid}>
          {submitButtonLabel}
        </LogInButton>
      </ButtonWrapper>
    </Form>
  );
};
