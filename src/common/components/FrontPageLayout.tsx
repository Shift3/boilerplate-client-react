import { Container, Col, Row } from 'react-bootstrap';
import tile from 'assets/img/tile.jpg';
import styled from 'styled-components';
import { FC, PropsWithChildren } from 'react';
import { ThemeToggle } from 'features/themes/ToggleSwitch';
import { Logo } from 'features/navbar/components/Logo';

export const Title = styled.h1`
  color: ${props => props.theme.forms.title};
  font-size: 1.5rem;
  font-style: bold;
`;

export const LoginContainer = styled(Container)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  max-width: 480px;

  & > div {
    width: 100%;
  }

  img {
    margin-top: 1.5rem;
    border-radius: ${props => props.theme.borderRadius};
    margin-bottom: 1rem;
    opacity: 0.9;
  }

  a {
    text-decoration: none;
  }

  label:after {
    content: ' *';
  }
`;

export const LoginRightCol = styled(Col)`
  background: url(${tile});
  position: relative;
  transition: all 0.15s ease-in-out;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.buttons.submitBackgroundColor};
    opacity: 0.9;
  }

  @media only screen and (max-width: 768px) {
    visibility: hidden;
    width: 0;
    flex: 0;
  }
`;

export const FrontPageLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <LoginContainer className='content-wrapper'>
            <div>
              <div className='position-relative'>
                <Logo />
                <ThemeToggle />
              </div>
              {children}
            </div>
          </LoginContainer>
        </Col>

        <LoginRightCol />
      </Row>
    </Container>
  );
};
