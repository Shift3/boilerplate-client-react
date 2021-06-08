import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import { CustomButton } from 'components/button/styled';
import { SignupFormSchema } from './schema';
import { SignupFormType } from './types';

export const SignupForm: SignupFormType = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(SignupFormSchema),
    mode: 'onChange'
  });

  return (
    <Form data-testid="signupForm" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control id="email" type="email" {...register('email')} />
        {errors.email?.message && <span role="alert">{errors.email?.message}</span>}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="confirmEmail">Confirm Email</Form.Label>
        <Form.Control id="confirmEmail" type="email" {...register('confirmEmail')} />
        {errors.confirmEmail?.message && <span role="alert">{errors.confirmEmail?.message}</span>}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="firstName">First Name</Form.Label>
        <Form.Control id="firstName" type="text" {...register('firstName')} />
        {errors.firstName?.message && <span role="alert">{errors.firstName?.message}</span>}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="lastName">Last Name</Form.Label>
        <Form.Control id="lastName" type="text" {...register('lastName')} />
        {errors.lastName?.message && <span role="alert">{errors.lastName?.message}</span>}
      </Form.Group>
      <CustomButton type="submit" name="submit" disabled={!isValid}>
        Login
      </CustomButton>
    </Form>
  );
};

export default SignupForm;
