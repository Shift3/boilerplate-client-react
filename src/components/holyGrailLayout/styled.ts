import styled from 'styled-components';
import {} from '../../utils/colors';

export const HolyGrailWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: minmax(200px, auto);
  grid-gap: 1em;
  @media all and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const HolyGrailNavLeft = styled.nav`
  @media all and (min-width: 768px) {
    order: 1;
    flex: 1;
  }
`;

export const HolyGrailMain = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  @media all and (min-width: 768px) {
    flex: 2;
    order: 2;
    min-height: 80vh;
  }
`;

export const HolyGrailFooter = styled.footer`
  grid-column: 1 / -1;
  width: 100%;
  order: 3;
`;
