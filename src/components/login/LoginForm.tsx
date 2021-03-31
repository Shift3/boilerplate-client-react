import React from 'react'
import { useForm } from 'react-hook-form'

interface ILoginFormProps {
  onSubmit: (username: string, password: string) => void
}

type Login = {
  username: string
  password: string
}

const LoginForm: React.FC<ILoginFormProps> = () => {
  const { register, handleSubmit } = useForm<Login>()

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = handleSubmit((data): void => {})

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">
          Username
          <input
            ref={register({
              required: true,
            })}
            id="username"
            name="username"
            type="text"
          />
        </label>
        <label htmlFor="lastname">
          Password
          <input
            ref={register({
              required: true,
            })}
            id="password"
            name="password"
            type="password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm
