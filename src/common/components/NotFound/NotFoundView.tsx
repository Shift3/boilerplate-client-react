import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  text-align: center;
`;

const NotFoundStatusCode = styled.h2`
  display: inline-block;
  font-size: 200px;
  font-weight: 500;
`;

const NotFoundLabel = styled.p`
  font-weight: 400;
`;

const GoBackButton = styled(Button)`
  color: ${(props) => props.theme.buttons.submitTextColor};
  background-color: ${(props) => props.theme.buttons.submitBackgroundColor};
  border-color: ${(props) => props.theme.buttons.submitBorderColor};
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;

  &:hover {
    background-color: ${(props) => props.theme.buttons.createHoverBackgroundColor};
    border-color: ${(props) => props.theme.buttons.createHoverBorderColor};
  }
`;

export const NotFoundView: FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Wrapper>
        <NotFoundStatusCode>404</NotFoundStatusCode>
        <NotFoundLabel>Something went wrong or this page doesn&apos;t exist anymore.</NotFoundLabel>
        <GoBackButton type='button' onClick={() => history.goBack()}>
          Go Back
        </GoBackButton>
      </Wrapper>
    </Container>
  );
};
