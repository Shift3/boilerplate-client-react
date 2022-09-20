import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SmallContainer = styled(Container)`
  max-width: 540px;

  @media (min-width: 768px) {
    max-width: 960px;
  }
`;

export const PageCrumb = styled.div`
  margin-bottom: 1rem;
  a {
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  color: ${props => props.theme.pages.pageHeader};
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: space-between;

  & > * {
    margin-bottom: 1rem;
  }

  img {
    border-radius: 50%;
    height: 64px;
    width: 64px;
    margin: 0;
    margin-right: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }

  & > div:first-of-type {
    p {
      color: ${props => props.theme.pages.p};
      margin: 0;
    }

    h1 {
      color: ${props => props.theme.pages.h1};
      font-weight: 500;
      font-size: 2rem;
      margin: 0;
      margin-bottom: 0.25rem;
    }
  }
`;
