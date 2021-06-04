/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { SignupFormSchema } from './schema';
import { SignupFormType } from './types';
import { Title, Wrapper, FieldTitle, ButtonWrapper, CancelButton, SignUpButton } from './styled';

export const SignupForm: SignupFormType = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupFormSchema),
    mode: 'onChange',
  });
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Sign Up</Title>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='email'>Email</Form.Label>{' '}
          </FieldTitle>
          <Form.Control id='email' type='email' {...register('email')} />
          {errors.email?.message && <span role='alert'>{errors.email?.message}</span>}
        </Form.Group>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='confirmEmail'>Confirm Email</Form.Label>{' '}
          </FieldTitle>
          <Form.Control id='confirmEmail' type='email' {...register('confirmEmail')} />
          {errors.confirmEmail?.message && <span role='alert'>{errors.confirmEmail?.message}</span>}
        </Form.Group>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='firstName'>First Name</Form.Label>
          </FieldTitle>
          <Form.Control id='firstName' type='text' {...register('firstName')} />
          {errors.firstName?.message && <span role='alert'>{errors.firstName?.message}</span>}
        </Form.Group>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='lastName'>Last Name</Form.Label>
          </FieldTitle>
          <Form.Control id='lastName' type='text' {...register('lastName')} />
          {errors.lastName?.message && <span role='alert'>{errors.lastName?.message}</span>}
        </Form.Group>
      </Form>
      <ButtonWrapper>
        <CancelButton role='button' type='submit'>
          CANCEL
        </CancelButton>
        <SignUpButton role='button' type='submit'>
          SIGN UP
        </SignUpButton>
      </ButtonWrapper>
    </Wrapper>
  );
};
export default SignupForm;
