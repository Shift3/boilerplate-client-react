import styled from 'styled-components';

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.pages.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
