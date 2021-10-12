import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ChangePasswordFormSchema } from './schema';
import { ChangePasswordFormType } from './types';
import {
  FormLabel,
  Title,
  StyledForm,
  InputError,
  ButtonWrapper,
  SubmitButton,
  CancelButton,
} from '../styles/StyledForm';

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
    <>
      <StyledForm data-testid='changePasswordForm' onSubmit={handleSubmit(onSubmit)}>
        <Title>Change Password</Title>
        <Form.Group>
          <FormLabel htmlFor='currentPassword'>Current Password</FormLabel>
          <Form.Control
            id='currentPassword'
            type='password'
            {...register('currentPassword')}
            placeholder='Enter current password'
          />
          {errors.currentPassword?.message && (
            <InputError role='alert' className='danger'>
              {errors.currentPassword?.message}
            </InputError>
          )}
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='newPassword'>New Password</FormLabel>
          <Form.Control
            id='newPassword'
            type='password'
            {...register('newPassword')}
            placeholder='Enter new password'
          />
          {errors.newPassword?.message && (
            <InputError role='alert' className='danger'>
              {errors.newPassword?.message}
            </InputError>
          )}
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
          <Form.Control
            id='confirmPassword'
            type='password'
            {...register('confirmPassword')}
            placeholder='Confirm password'
          />
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

export default ChangePasswordForm;
