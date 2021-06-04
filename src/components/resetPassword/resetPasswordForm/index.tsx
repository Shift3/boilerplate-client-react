/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'react-bootstrap';
import { ResetPasswordFormSchema } from './schema';
import { ResetPasswordFormType } from './types';

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control id='password' type='password' {...register('password')} />
        {errors.password?.message && (
          <span role='alert' className='danger'>
            {errors.password?.message}
          </span>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
        <Form.Control id='confirmPassword' type='password' {...register('confirmPassword')} />
        {errors.confirmPassword?.message && (
          <span role='alert' className='danger'>
            {errors.confirmPassword?.message}
          </span>
        )}
      </Form.Group>
      <Button type='submit' role='button' disabled={!isValid}>
        Login
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
