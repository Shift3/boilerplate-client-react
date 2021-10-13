import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { SignUpFormSchema } from './schema';
import { SignUpFormType } from './types';
import { ButtonWrapper, CancelButton, SubmitButton, StyledForm, Title } from '../../../styles/FormStyles';

export const SignUpForm: SignUpFormType = ({ onSubmit, onCancel }) => {
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
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control id='email' type='email' {...register('email')} placeholder='Enter your email' />
        <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='confirmEmaisl' placeholder='Confirm email'>
          Confirm Email
        </Form.Label>
        <Form.Control id='confirmEmail' type='email' {...register('confirmEmail')} placeholder='Confirm your email' />
        <Form.Control.Feedback type='invalid'>{errors.confirmEmail?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='firstName' placeholder='Enter your first name'>
          First Name
        </Form.Label>
        <Form.Control id='firstName' type='text' {...register('firstName')} placeholder='Enter your first name' />
        <Form.Control.Feedback>{errors.firstName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='lastName' placeholder='Enter your last name'>
          Last Name
        </Form.Label>
        <Form.Control id='lastName' type='text' {...register('lastName')} placeholder='Enter your last name' />
        <Form.Control.Feedback>{errors.lastName?.message}</Form.Control.Feedback>
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
