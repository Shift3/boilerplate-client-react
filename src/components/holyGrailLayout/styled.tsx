import styled from 'styled-components';
import { } from '../../utils/styleValues';

export const HolyGrailWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: minmax(100px, auto);
    grid-template-areas:
      "hd   hd   hd   hd   hd  hd"
      "lsd main main main main rsd"
      "ft   ft   ft   ft   ft  ft";
`;

export const HolyGrailHeader = styled.div`
    grid-area: hd;
`;

export const HolyGrailLeftSideBar = styled.div`
  grid-area: lsd
  `;

export const HolyGrailMain = styled.div`
  grid-area: main
  `;

export const HolyGrailRightSideBar = styled.div`
  grid-area: rsd
  `;

export const HolyGrailFooter = styled.div`
  grid-area: ft
  `;
