import { Card, Container } from 'react-bootstrap';
import styled from 'styled-components';

export const SmallContainer = styled(Container)`
  max-width: 960px;
`;

export const CircularContainer = styled.div<{
  radius: number;
  backgroundColor: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: ${props => `${props.radius}px`};
  width: ${props => `${props.radius}px`};
  background-color: ${props => `${props.backgroundColor}`};
`;

export const CircularImg = styled.img<{
  radius: number;
}>`
  border-radius: 50%;
  height: ${props => `${props.radius}px`};
  width: ${props => `${props.radius}px`};
  margin: 0;
  margin-right: 0.75rem;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

export const FormCard = styled(Card)`
  background: white;
  border-radius: 6px;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
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
      margin: 0;
    }

    h1 {
      font-weight: 500;
      font-size: 2rem;
      margin: 0;
      margin-bottom: 0.25rem;
    }
  }
`;

export const TableCard = styled(Card)`
  background: white;
  border-radius: 6px;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  .card-body {
    padding: 0;
  }

  .table-paginator {
    padding: 1rem;
  }

  .table {
    border: none;
    margin: 0;

    .thead {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      padding: 0 1rem;
      color: #666;

      .th {
        border: none;
        font-weight: 500;
        font-size: 0.825rem;
        padding: 0.75rem 0.5rem;

        i,
        svg {
          color: #999;
          margin-left: 0.6rem;
        }
      }
    }

    .tbody > .tr {
      cursor: pointer;
      transition: all 0.15s ease;
      padding: 0 1rem;

      &:hover {
        background: #efefef;
      }

      .td {
        border: 0;
        padding: 0.5rem;
        display: flex;
        align-items: center;

        &:last-of-type {
          justify-content: flex-end;
          text-align: right;
        }
      }
    }
  }
`;

export const NoContent = styled.div`
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  i,
  svg {
    color: #333;
    margin-bottom: 0.5rem;
  }
`;
