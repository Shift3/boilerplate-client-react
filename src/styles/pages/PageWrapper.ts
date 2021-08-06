import styled from 'styled-components';

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.authBackground};
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
