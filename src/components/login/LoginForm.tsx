import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import Button from 'react-bootstrap/button'

interface ILoginFormProps {
  onSubmit: (username: string, password: string) => void
}

interface ILoginFormValues {
  username: string
  password: string
}

const LoginForm = (props: ILoginFormProps) => {
  const initialValues: ILoginFormValues = {
    username: '',
    password: '',
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!username || !password) {
      return
    }
    onSubmit(username, password)
  }

  return (
    <>
      <h1>Login</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ notValid, isValid }) => (
          <Form>
            <Field name="username" label="Username" required />
            <Field name="password" label="Password" required type="password" />
            <Button type="submit">Submit</Button>
          </Form>
          // <Button type="submit">Submit</Button>
        )}
      </Formik>
    </>
  )
}

export default LoginForm
