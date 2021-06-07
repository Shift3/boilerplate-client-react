/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { ResetPasswordFormSchema } from './schema';
import { ResetPasswordFormType } from './types';
import { FieldTitle, Title, StyledForm, Error, ButtonWrapper, SubmitButton } from './styled';

export const ResetPasswordForm: ResetPasswordFormType = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ResetPasswordFormSchema),
    mode: 'onChange',
  });

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Title>Reset Password</Title>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='password'>Current Password</Form.Label>
          </FieldTitle>
          <Form.Control id='currentPassword' type='password' {...register('currentPassword')} />
          <Error>
            {errors.password?.message && (
              <span role='alert' className='danger'>
                {errors.currentPassword?.message}
              </span>
            )}
          </Error>
        </Form.Group>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='password'>New Password</Form.Label>
          </FieldTitle>
          <Form.Control id='newPassword' type='password' {...register('newPassword')} />
          <Error>
            {errors.password?.message && (
              <span role='alert' className='danger'>
                {errors.newPassword?.message}
              </span>
            )}
          </Error>
        </Form.Group>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
          </FieldTitle>
          <Form.Control id='confirmPassword' type='password' {...register('confirmPassword')} />
          <Error>
            {errors.confirmPassword?.message && (
              <span role='alert' className='danger'>
                {errors.confirmPassword?.message}
              </span>
            )}
          </Error>
        </Form.Group>
        <ButtonWrapper>
          <SubmitButton data-testid='Sign Up Button' type='submit' disabled={!isValid}>
            Submit
          </SubmitButton>
        </ButtonWrapper>
      </StyledForm>
    </>
  );
};

export default ResetPasswordForm;
