import React from 'react'
import styled from 'styled-components'
import { LoginForm } from '../components/login/LoginForm'

const Wrapper = styled.div`
  display: grid;
  grid-template: 15vh 70vh 15vh / 20% auto 20%;
`
const LoginGrid = styled.main`
  display: grid;
  grid-template: 70vh / 33.3% 66.6%;
  grid-area: 2 / 2 / 2 / 2;
  border-radius: 15.78px;
  overflow: hidden;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.28);
`

const HomePage: React.FC = () => {
  // eslint-disable-next-line
  const onLoginFormSubmit = (username: string, password: string) => {}

  return (
    <Wrapper>
      <LoginGrid>
        <LoginForm onSubmit={onLoginFormSubmit} />
      </LoginGrid>
    </Wrapper>
  )
}

export default HomePage
