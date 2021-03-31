import React from 'react'
import { useForm } from 'react-hook-form'

interface ILoginFormProps {
  onSubmit: (username: string, password: string) => void
}

type Login = {
  firstname: string
  lastname: string
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
          Last Name
          <input
            ref={register({
              required: true,
            })}
            id="password"
            name="password"
            type="password"
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export default LoginForm
