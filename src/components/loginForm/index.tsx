/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { LogInFormSchema } from './schema';
import { LogInFormType } from './types';
import { Error, FieldTitle, StyledForm, Title } from '../loginForm/styled';

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
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        s<FieldTitle>Member Log In</FieldTitle>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='email'>Email</Form.Label>
          </FieldTitle>
          <Form.Control id='email' type='email' {...register('email')} />
          <Error>
            {errors.email?.message && (
              <span role='alert' className='text-danger'>
                {errors.email?.message}
              </span>
            )}
          </Error>
        </Form.Group>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='password'>Password</Form.Label>
          </FieldTitle>
          <Form.Control id='password' type='password' {...register('password')} />
          <Error>
            {errors.password?.message && (
              <span role='alert' className='text-danger'>
                {errors.password?.message}
              </span>
            )}
          </Error>
        </Form.Group>
        <ButtonWrapper>
          <CancelButton data-testid='Cancel Button' onClick={onCancel}>
            CANCEL
          </CancelButton>
          <LogInButton data-testid='Log In Button' type='submit' disabled={!isValid}>
            LOG IN
          </LogInButton>
        </ButtonWrapper>
      </StyledForm>
    </>
  );
};
