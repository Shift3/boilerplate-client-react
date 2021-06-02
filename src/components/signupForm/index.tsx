/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-props-no-spreading */
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { SignupFormSchema } from './schema';
import { SignupFormType } from './types';
import { Title, FieldTitle, ButtonWrapper, CancelButton, SignUpButton, StyledForm } from './styled';

export const SignupForm: SignupFormType = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,

    // formState: { errors, isValid },
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupFormSchema),
    mode: 'onChange',
  });

  const history = useHistory();

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
        <ButtonWrapper>
          <CancelButton
            data-testid='Cancel Button'
            onClick={() => {
              history.goBack();
            }}
          >
            CANCEL
          </CancelButton>
          <SignUpButton data-testid='Sign Up Button' type='submit'>
            SIGN UP
          </SignUpButton>
        </ButtonWrapper>
      </StyledForm>
    </>
  );
};
export default SignupForm;
