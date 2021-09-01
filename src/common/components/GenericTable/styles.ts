import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

export const StyledTable = styled(Table)`
  thead {
    background-color: ${(props) => props.theme.primary};
    color: white;
  }

  th {
    border-top: 0;
  }

  th:nth-child(1) {
    border-radius: 15px 0px 0px 0px;
  }

  th:nth-last-child(1) {
    border-radius: 0px 15px 0px 0px;
  }

  tbody > tr {
    background: white;
  }

  td {
    color: ${(props) => props.theme.primary};
  }
`;