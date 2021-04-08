import React from 'react'
import { LoginForm } from '../components/login/LoginForm'

const HomePage: React.FC = () => {
  // eslint-disable-next-line
  const onLoginFormSubmit = (username: string, password: string) => {}

  return (
    <div>
      <LoginForm onSubmit={onLoginFormSubmit} />
    </div>
  )
}

export default HomePage
