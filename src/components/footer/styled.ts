import styled from 'styled-components';

export const FooterWrapper = styled.div`
  text-align: center;
  background-color: #175f6e;
  color: white;
  position: relative;
  bottom: 0;
  width: 100vw;
  height: ${(props) => props.theme.footerHeight};
`;
