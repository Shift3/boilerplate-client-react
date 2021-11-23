import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { ButtonWrapper, CancelButton, SubmitButton } from 'features/styles/PageStyles';
import { ActivateAccountFormSchema } from './schema';
import { ActivateAccountFormType } from './types';

export const ActivateAccountForm: ActivateAccountFormType = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ActivateAccountFormSchema),
    mode: 'all',
  });

  // Trigger validation on first render.
  useEffect(() => {
    trigger();
  }, [trigger]);

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
