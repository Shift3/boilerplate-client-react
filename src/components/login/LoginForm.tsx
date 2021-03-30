import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import Button from 'react-bootstrap/button'
import FormikField from './LoginFormField'

interface ILoginFormProps {
  onSubmit: (username: string, password: string) => void
}

interface ILoginFormValues {
  username: string
  password: string
}

const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit }: ILoginFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const initialValues: ILoginFormValues = {
    username: '',
    password: '',
  }

  const handleSubmit = (): void => {
    if (!username || !password) {
      return
    }

    onSubmit(username, password)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ dirty, isValid }) => (
        <Form>
          <FormikField username="username" label="Username" required />
          <FormikField username="password" label="Password" required type="password" />
          <Button disabled={!dirty || !isValid} type="submit">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  )
}
export default LoginForm
