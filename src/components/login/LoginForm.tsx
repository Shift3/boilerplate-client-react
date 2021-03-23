import React, { useState } from 'react'
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'

interface ILoginFormProps {
  onSubmit: (username: string, password: string) => void
}

const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit }: ILoginFormProps) => {
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="loginFormUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="loginFormPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default LoginForm
