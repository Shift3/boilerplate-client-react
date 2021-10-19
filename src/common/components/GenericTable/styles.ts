import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

export const StyledTable = styled(Table)`
  border-color: ${(props) => props.theme.tables.borderColor};
  
  thead {
    background-color: ${(props) => props.theme.tables.headerBackgroundColor};
    color: ${(props) => props.theme.tables.headerTextColor};
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
    color: ${(props) => props.theme.tables.textColor};
  }
`;