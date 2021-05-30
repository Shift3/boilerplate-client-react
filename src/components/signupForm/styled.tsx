import styled from 'styled-components';

export const Wrapper = styled.form`
  background-color: ${(props) => props.theme.primary};
  padding: 40px;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.cardHeader};
  font-size: 2em;
  font-style: bold;
`;

export const FieldTitle = styled.div`
  color: white;
`;
