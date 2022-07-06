import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

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

    .tbody {
      border: none;
    }

    .thead {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      padding: 0 1rem;
      color: blackwhite;

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
