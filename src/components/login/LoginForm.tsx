import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ILoginFormData, ILoginFormProps } from '../../interfaces';
import { loginFormSchema } from './validation';
import { Context as AuthContext } from '../../context/auth.context';

export const LoginForm: FC<ILoginFormProps> = () => {
  const { loginUser } = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm<ILoginFormData>({
    resolver: yupResolver(loginFormSchema),
  })

  const onSubmit = handleSubmit((formData: ILoginFormData) => loginUser(formData));

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
