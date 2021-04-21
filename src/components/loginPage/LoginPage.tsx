import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
// import styled from 'styled-components'
import { Container, Row } from 'react-bootstrap'
import { LoginForm } from '../login/LoginForm'
import { Context as AuthContext } from '../../context/auth.context'
// const LoginContainer = styled.div`
//   display: flex;
//   background: #175f6e;
//   border-radius: 0.25rem;
//   height: 100vh;
//   margin: 20px 20px 20px 20px;
// `
// const LoginFormContainer = styled.div`
//   border: 2px solid red;
//   display: flex;
//   width: 50%;
//   height: 50%;
//   justify-content: center;
//   align-items: center;
// `

export const LoginPage: FC = () => {
  const { loginUser } = useContext(AuthContext)

  return (
    <Container fluid>
      <Row>
        <LoginForm onSubmit={loginUser} />
        <Link to="/auth/forgot-password">Forgot Password?</Link>
      </Row>
    </Container>
  )
}
