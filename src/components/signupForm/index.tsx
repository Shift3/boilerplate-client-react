/* eslint-disable lines-around-comment */
/* eslint-disable jsx-quotes */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { SignUpFormSchema } from './schema';
import { SignUpFormType } from './types';
import { Title, FieldTitle, ButtonWrapper, CancelButton, SignUpButton, StyledForm, Error } from './styled';

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
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Title>Sign Up</Title>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='email'>Email</Form.Label>{' '}
          </FieldTitle>
          <Form.Control id='email' type='email' {...register('email')} />
          <Error>{errors.email?.message && <span role='alert'>{errors.email?.message}</span>}</Error>
        </Form.Group>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='confirmEmail'>Confirm Email</Form.Label>{' '}
          </FieldTitle>
          <Form.Control id='confirmEmail' type='email' {...register('confirmEmail')} />
          <Error>{errors.confirmEmail?.message && <span role='alert'>{errors.confirmEmail?.message}</span>}</Error>
        </Form.Group>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='firstName'>First Name</Form.Label>
          </FieldTitle>
          <Form.Control id='firstName' type='text' {...register('firstName')} />
          <Error>{errors.firstName?.message && <span role='alert'>{errors.firstName?.message}</span>}</Error>
        </Form.Group>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='lastName'>Last Name</Form.Label>
          </FieldTitle>
          <Form.Control id='lastName' type='text' {...register('lastName')} />
          <Error>{errors.lastName?.message && <span role='alert'>{errors.lastName?.message}</span>}</Error>
        </Form.Group>
        <ButtonWrapper>
          <CancelButton data-testid='Cancel Button' onClick={onCancel}>
            CANCEL
          </CancelButton>
          <SignUpButton data-testid='Sign Up Button' type='submit' disabled={!isValid}>
            SIGN UP
          </SignUpButton>
        </ButtonWrapper>
      </StyledForm>
    </>
  );
};
