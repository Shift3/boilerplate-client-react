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
        {({ isSubmitting }) => (
          <Form>
            <Field name="username" type="text" label="Username" required />
            <Field name="password" type="password" label="Password" required />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default LoginForm
