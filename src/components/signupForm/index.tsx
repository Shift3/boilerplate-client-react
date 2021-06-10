/* eslint-disable lines-around-comment */
/* eslint-disable jsx-quotes */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { SignUpFormSchema } from './schema';
import { SignUpFormType } from './types';
import { Title, FormLabel, ButtonWrapper, CancelButton, SignUpButton, StyledForm, InputError } from './styled';

export const SignUpForm: SignUpFormType = ({ onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(SignUpFormSchema),
    mode: 'onChange',
  });

  return (
    <>
      <StyledForm data-testid="signupForm" onSubmit={ handleSubmit(onSubmit) }>
        {/* @HERE - pair programming - Heading? */}
        <Title>Sign Up</Title>
        <Form.Group>
          <FormLabel htmlFor='email'>Email</FormLabel>{' '}
          <Form.Control id='email' type='email' {...register('email')} />
          {
            errors.email?.message &&
            (<InputError role='alert'>{errors.email?.message}</InputError>)
          }
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='confirmEmail'>Confirm Email</FormLabel>{' '}
          <Form.Control id='confirmEmail' type='email' {...register('confirmEmail')} />
          {
            errors.confirmEmail?.message &&
              (<InputError role='alert'>{errors.confirmEmail?.message}</InputError>)
          }
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='firstName'>First Name</FormLabel>
          <Form.Control id='firstName' type='text' {...register('firstName')} />
          {
            errors.firstName?.message &&
              (<InputError role='alert'>{errors.firstName?.message}</InputError>)
          }
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='lastName'>Last Name</FormLabel>
          <Form.Control id='lastName' type='text' {...register('lastName')} />
          {
            errors.lastName?.message &&
              (<InputError role='alert'>{errors.lastName?.message}</InputError>)
          }
        </Form.Group>
        <ButtonWrapper>
          <CancelButton data-testid='cancelButton' onClick={onCancel}>
            CANCEL
          </CancelButton>
          <SignUpButton data-testid='submitButton' type='submit' disabled={!isValid}>
            SIGN UP
          </SignUpButton>
        </ButtonWrapper>
      </StyledForm>
    </>
  );
};
