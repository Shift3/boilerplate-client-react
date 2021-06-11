/* eslint-disable indent */
/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ResetPasswordFormSchema } from './schema';
import { ResetPasswordFormType } from './types';
import { FormLabel, Title, StyledForm, InputError, ButtonWrapper, SubmitButton, CancelButton } from './styled';

export const ResetPasswordForm: ResetPasswordFormType = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ResetPasswordFormSchema),
    mode: 'onChange',
  });

  const history = useHistory();

  const navigateToLogin = () => {
    history.push('/auth/login');
  };

  return (
    <>
      <StyledForm data-testid='resetPasswordForm' onSubmit={handleSubmit(onSubmit)}>
        <Title>Reset Password</Title>
        <Form.Group>
          <FormLabel htmlFor='currentPassword'>Current Password</FormLabel>
          <Form.Control id='currentPassword' type='password' {...register('currentPassword')} />
          {errors.currentPassword?.message && (
            <InputError role='alert' className='danger'>
              {errors.currentPassword?.message}
            </InputError>
          )}
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='newPassword'>New Password</FormLabel>
          <Form.Control id='newPassword' type='password' {...register('newPassword')} />
          {errors.newPassword?.message && (
            <InputError role='alert' className='danger'>
              {errors.newPassword?.message}
            </InputError>
          )}
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
          <Form.Control id='confirmPassword' type='password' {...register('confirmPassword')} />
          {errors.confirmPassword?.message && (
            <InputError role='alert' className='danger'>
              {errors.confirmPassword?.message}
            </InputError>
          )}
        </Form.Group>
        <ButtonWrapper>
          <CancelButton data-testid='cancelButton' onClick={navigateToLogin}>
            Cancel
          </CancelButton>
          <SubmitButton data-testid='submitButton' type='submit' disabled={!isValid}>
            Submit
          </SubmitButton>
        </ButtonWrapper>
      </StyledForm>
    </>
  );
};

export default ResetPasswordForm;
