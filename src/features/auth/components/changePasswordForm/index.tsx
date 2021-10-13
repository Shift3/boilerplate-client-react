import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ChangePasswordFormSchema } from './schema';
import { ChangePasswordFormType } from './types';
import { ButtonWrapper, CancelButton, SubmitButton, StyledForm } from '../../../styles/PageStyles';

export const ChangePasswordForm: ChangePasswordFormType = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ChangePasswordFormSchema),
    mode: 'all',
  });

  const history = useHistory();

  const navigateToLogin = () => {
    history.push('/auth/login');
  };

  return (
    <StyledForm data-testid='changePasswordForm' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='currentPassword'>Current Password</Form.Label>
        <Form.Control
          id='currentPassword'
          type='password'
          {...register('currentPassword')}
          placeholder='Enter current password'
        />
        <Form.Control.Feedback type='invalid'>{errors.currentPassword?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='newPassword'>New Password</Form.Label>
        <Form.Control id='newPassword' type='password' {...register('newPassword')} placeholder='Enter new password' />
        <Form.Control.Feedback type='invalid'> {errors.newPassword?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
        <Form.Control
          id='confirmPassword'
          type='password'
          {...register('confirmPassword')}
          placeholder='Confirm password'
        />
        <Form.Control.Feedback type='invalid'> {errors.confirmPassword?.message}</Form.Control.Feedback>
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
  );
};
