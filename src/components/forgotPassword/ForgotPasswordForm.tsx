import { useForm } from 'react-hook-form';
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { ForgotPasswordFormSchema } from './schema';
import { ForgotPasswordFormProps } from './types';
import {
  StyledForm,
  Title,
  FormLabel,
  InputError,
  ButtonWrapper,
  CancelButton,
  SubmitButton,
} from '../../styles/components/Forms';

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ForgotPasswordFormSchema),
    mode: 'onChange',
  });

  return (
    <StyledForm data-testid='forgotPasswordForm' onSubmit={handleSubmit(onSubmit)}>
      <Title>Forgot Password</Title>
      <Form.Group>
        <FormLabel htmlFor='email'>Email</FormLabel>{' '}
        <Form.Control id='email' type='email' {...register('email')} placeholder='Enter email' />
        {errors.email?.message && <InputError role='alert'>{errors.email?.message}</InputError>}
      </Form.Group>
      <ButtonWrapper>
        <CancelButton data-testid='cancelButton' onClick={onCancel}>
          CANCEL
        </CancelButton>
        <SubmitButton data-testid='submitButton' type='submit' disabled={!isValid}>
          SUBMIT
        </SubmitButton>
      </ButtonWrapper>
    </StyledForm>
  );
};
