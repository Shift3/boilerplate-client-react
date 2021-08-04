import { ReactElement } from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { GenericTableProps, WithId } from './types';

const StyledTable = styled(Table)`
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

export const GenericTable = <ObjectType extends WithId>(props: GenericTableProps<ObjectType>): ReactElement => {
  const { objects, properties } = props;

  return (
    <div>
      <StyledTable responsive>
        <thead>
          <tr>
            {properties.map((property) => (
              <th key={String(property.key)}>{property.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {objects.map((obj) => (
            <tr key={obj.id}>
              {properties.map((property) => (
                <td key={String(property.key)}>{obj[property.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};
