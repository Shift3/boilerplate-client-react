import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { ResetPasswordFormSchema } from './schema';
import { ResetPasswordFormType } from './types';
import { ButtonWrapper, CancelButton, SubmitButton } from 'features/styles/PageStyles';

export const ResetPasswordForm: ResetPasswordFormType = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ResetPasswordFormSchema),
    mode: 'all',
  });

  return (
    <Form data-testid='resetPasswordForm' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='newPassword'>New Password</Form.Label>
        <Form.Control
          id='newPassword'
          type='password'
          {...register('newPassword')}
          placeholder='Enter new password'
          isInvalid={!!errors.newPassword}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.newPassword?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
        <Form.Control
          id='confirmPassword'
          type='password'
          {...register('confirmPassword')}
          placeholder='Confirm password'
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.confirmPassword?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>CANCEL</CancelButton>
        <SubmitButton type='submit' disabled={!isValid}>
          SUBMIT
        </SubmitButton>
      </ButtonWrapper>
    </Form>
  );
};
