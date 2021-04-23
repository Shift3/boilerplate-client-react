import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components'
import { Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { LoginForm } from '../login/LoginForm';
import { Context as AuthContext } from '../../context/auth.context';

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: colunn;
`;

export const LoginPage: FC = () => {
  const { loginUser } = useContext(AuthContext);

  return (
    <Container fluid>
      <Row>
        <LoginFormContainer>
          <LoginForm onSubmit={loginUser} />
          <Link to="/auth/forgot-password">Forgot Password?</Link>
        </LoginFormContainer>
      </Row>
    </Container>
  );
};
