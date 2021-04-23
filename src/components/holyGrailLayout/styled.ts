import styled from 'styled-components';
import {} from '../../utils/colors';

export const HolyGrailWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: minmax(100px, auto);
  @media (max-width: 768px) {
  }
`;

export const HolyGrailNavLeft = styled.nav`
  background-color: grey;
  /* grid-area: nav; */
`;

export const HolyGrailMain = styled.main`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  background-color: authBackground;
`;

export const HolyGrailFooter = styled.footer`
  background-color: pink;
  grid-column: 1 / -1;
`;
