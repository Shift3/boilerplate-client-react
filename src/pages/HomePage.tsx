import React from 'react'
import { LoginForm } from '../components/login/LoginForm'

const HomePage: React.FC = () => {
  const onLoginFormSubmit = (username: string, password: string) => {
    // eslint-disable-next-line no-console
    console.log('username', username)
    // eslint-disable-next-line no-console
    console.log('password', password)
  }

  return (
    <div>
      <LoginForm onSubmit={onLoginFormSubmit} />
    </div>
  )
}

export default HomePage
