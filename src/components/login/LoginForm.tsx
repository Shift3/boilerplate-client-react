import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const LoginKey: { [P in keyof ILogin]: P } = {
  username: 'username',
  password: 'password',
}

const loginSchema: yup.SchemaOf<ILogin> = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})

interface ILogin {
  username: string
  password: string
}

const useLoginForm = () =>
  useForm<ILogin>({
    // validationSchema: loginSchema,
  })

export const LoginForm: FC = () => {
  const { register, errors, handleSubmit } = useLoginForm()

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line no-console
    console.log(data)
  })

  return (
    <form className="login-form form" onSubmit={onSubmit}>
      <div className="form__control">
        <label htmlFor="username">
          <span>Username</span>
          <input type="text" name={LoginKey.username} ref={register} />
        </label>
        {errors.username && <p className="form__error">{errors.username.message}</p>}
      </div>

      <div className="form__control">
        <label htmlFor="password">
          <span>Password</span>
          <input type="password" name={LoginKey.password} ref={register} />
        </label>
        {errors.password && <p className="form__error">{errors.password.message}</p>}
      </div>

      <div className="form__control">
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
