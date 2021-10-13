import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { ResetPasswordFormSchema } from './schema';
import { ResetPasswordFormType } from './types';
import { ButtonWrapper, CancelButton, SubmitButton, StyledForm, Title } from '../../../styles/PageStyles';

export const ResetPasswordForm: ResetPasswordFormType = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ResetPasswordFormSchema),
    mode: 'onChange',
  });

  return (
    <StyledForm data-testid='resetPasswordForm' onSubmit={handleSubmit(onSubmit)}>
      <Title>Reset Password</Title>
      <Form.Group>
        <Form.Label htmlFor='newPassword'>New Password</Form.Label>
        <Form.Control id='newPassword' type='text' {...register('newPassword')} placeholder='Enter new password' />
        <Form.Control.Feedback type='invalid'>{errors.newPassword?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
        <Form.Control
          id='confirmPassword'
          type='password'
          {...register('confirmPassword')}
          placeholder='Confirm password'
        />
        <Form.Control.Feedback type='invalid'>{errors.confirmPassword?.message}</Form.Control.Feedback>
      </Form.Group>
      <ButtonWrapper>
        <CancelButton data-testid='cancelButton' onClick={onCancel}>
          CANCEL
        </CancelButton>
        <SubmitButton data-testid='submitButton' type='submit' disabled={!isValid}>
          SUBMIT
        </SubmitButton>
      </ButtonWrapper>
    </StyledForm>
  );
};
