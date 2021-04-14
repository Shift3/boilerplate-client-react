import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { loginFormSchema } from './validation';
import { ILoginFormData, ILoginFormProps } from './types';

export const LoginForm: FC<ILoginFormProps> = (props) => {
  const { register, handleSubmit, errors } = useForm<ILoginFormData>({
    resolver: yupResolver(loginFormSchema),
  })

  const onSubmit = handleSubmit((formData: ILoginFormData) => props.onSubmit(formData));

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">
        <span>Username</span>
        <input id="username" type="text" name="username" ref={register} />
      </label>
      {errors.username && <span role="alert">{errors.username.message}</span>}
      <label htmlFor="password">
        <span>Password</span>
        <input id="password" type="password" name="password" ref={register} />
      </label>
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <button type="submit">Submit</button>
    </form>
  )
}
