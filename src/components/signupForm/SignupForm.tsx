import { useForm } from 'react-hook-form';
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { SignUpFormSchema } from './schema';
import { SignUpFormProps } from './types';
import {
  StyledForm,
  Title,
  FormLabel,
  InputError,
  ButtonWrapper,
  CancelButton,
  SubmitButton,
} from '../../styles/components/Forms';

export const SignUpForm: FC<SignUpFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(SignUpFormSchema),
    mode: 'onChange',
  });

  return (
    <StyledForm data-testid='signupForm' onSubmit={handleSubmit(onSubmit)}>
      <Title>Sign Up</Title>
      <Form.Group>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Form.Control id='email' type='email' {...register('email')} placeholder='Enter your email' />
        {errors.email?.message && <InputError role='alert'>{errors.email?.message}</InputError>}
      </Form.Group>
      <Form.Group>
        <FormLabel htmlFor='confirmEmail' placeholder='Confirm email'>
          Confirm Email
        </FormLabel>
        <Form.Control id='confirmEmail' type='email' {...register('confirmEmail')} placeholder='Confirm your email' />
        {errors.confirmEmail?.message && <InputError role='alert'>{errors.confirmEmail?.message}</InputError>}
      </Form.Group>
      <Form.Group>
        <FormLabel htmlFor='firstName' placeholder='Enter your first name'>
          First Name
        </FormLabel>
        <Form.Control id='firstName' type='text' {...register('firstName')} placeholder='Enter your first name' />
        {errors.firstName?.message && <InputError role='alert'>{errors.firstName?.message}</InputError>}
      </Form.Group>
      <Form.Group>
        <FormLabel htmlFor='lastName' placeholder='Enter your last name'>
          Last Name
        </FormLabel>
        <Form.Control id='lastName' type='text' {...register('lastName')} placeholder='Enter your last name' />
        {errors.lastName?.message && <InputError role='alert'>{errors.lastName?.message}</InputError>}
      </Form.Group>
      <ButtonWrapper>
        <CancelButton data-testid='cancelButton' onClick={onCancel}>
          CANCEL
        </CancelButton>
        <SubmitButton data-testid='signUpButton' type='submit' disabled={!isValid}>
          SIGN UP
        </SubmitButton>
      </ButtonWrapper>
    </StyledForm>
  );
};
