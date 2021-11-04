import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { SignUpFormSchema } from './schema';
import { SignUpFormType } from './types';
import { ButtonWrapper, CancelButton, SubmitButton } from 'features/styles/PageStyles';

export const SignUpForm: SignUpFormType = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(SignUpFormSchema),
    mode: 'all',
  });

  // Trigger validation on first render.
  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Form data-testid='signupForm' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          id='email'
          type='email'
          {...register('email')}
          placeholder='Enter your email'
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='confirmEmail' placeholder='Confirm email'>
          Confirm Email
        </Form.Label>
        <Form.Control
          id='confirmEmail'
          type='email'
          {...register('confirmEmail')}
          placeholder='Confirm your email'
          isInvalid={!!errors.confirmEmail}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.confirmEmail?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='firstName' placeholder='Enter your first name'>
          First Name
        </Form.Label>
        <Form.Control
          id='firstName'
          type='text'
          {...register('firstName')}
          placeholder='Enter your first name'
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.firstName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='lastName' placeholder='Enter your last name'>
          Last Name
        </Form.Label>
        <Form.Control
          id='lastName'
          type='text'
          {...register('lastName')}
          placeholder='Enter your last name'
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.lastName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>CANCEL</CancelButton>
        <SubmitButton type='submit' disabled={!isValid}>
          SIGN UP
        </SubmitButton>
      </ButtonWrapper>
    </Form>
  );
};
