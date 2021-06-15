import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { ResetPasswordFormSchema } from './schema';
import { ResetPasswordFormType } from './types';
import { Title, FormLabel, ButtonWrapper, CancelButton, SubmitButton, StyledForm, InputError } from './styled';

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
    <>
      <StyledForm data-testid='resetPasswordForm' onSubmit={handleSubmit(onSubmit)}>
        <Title>Reset Password</Title>
        <Form.Group>
          <FormLabel htmlFor='newPassword'>New Password</FormLabel>
          <Form.Control id='newPassword' type='pasword' {...register('newPassword')} placeholder='Enter new password' />
          {errors.newPassword?.message && <InputError role='alert'>{errors.newPassword?.message}</InputError>}
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
          <Form.Control
            id='confirmPassword'
            type='password'
            {...register('confirmPassword')}
            placeholder='Confirm password'
          />
          {errors.confirmPassword?.message && <InputError role='alert'>{errors.confirmPassword?.message}</InputError>}
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
    </>
  );
};
