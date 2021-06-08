import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import { CustomButton } from 'components/button/styled';
import { LoginFormSchema } from './schema';
import { LoginFormType } from './types';

export const LoginForm: LoginFormType = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(LoginFormSchema),
    mode: 'onChange'
  });

  return (
    <Form data-testid="loginForm" onSubmit={handleSubmit(onSubmit)} >
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control id="email" type="email" {...register('email')} />
        {errors.email?.message && (
          <span role="alert" className="text-danger">
            {errors.email?.message}
          </span>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control id="password" type="password" {...register('password')} />
        {errors.password?.message && (
          <span role="alert" className="text-danger">
            {errors.password?.message}
          </span>
        )}
      </Form.Group>
      <CustomButton type="submit" name="submit" disabled={!isValid}>
        Login
      </CustomButton>
    </Form>
  );
};
