import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

export const TableCard = styled(Card)`
  .card-body {
    padding: 0;
  }

  .table-paginator {
    padding: 1rem;
  }

  .table {
    border: none;
    margin: 0;
    color: ${props => props.theme.textColor};

    .tbody {
      border: none;
    }

    .thead {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      padding: 0 1rem;
      color: ${props => props.theme.card.textColor};

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
        background: ${props => props.theme.table.rowHoverColor};
      }

      .td {
        border: 0;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        word-break: break-all;

        &:last-of-type {
          justify-content: flex-end;
          text-align: right;
        }
      }
    }
  }
`;
