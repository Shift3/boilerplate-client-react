import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: ${(props) => props.theme.minPageHeight};
  width: 100%;
  background-color: ${(props) => props.theme.authBackground};
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
