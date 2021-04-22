import styled from 'styled-components';

export const HolyGrailWrapper = styled.div`
  border: 2px solid red;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-rows: auto;
`;
/* grid-template-areas:
    'nav main side'
    'nav main side'
    'footer footer footer';
  grid-template-columns: '1fr 2fr 1fr';
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  flex-direction: column;
  @media (max-width: 768px) {
    .container {
      grid-template-areas:
        'nav'
        'main'
        'side'
        'footer';
      grid-template-columns: 1fr;
      grid-template-rows:
        auto
        minmax(100px, auto) /* Nav */
// 1fr /* Content */
// minmax(100px, auto) /* Sidebar */
// auto; /* Footer */
/* } */
/* } */

export const HolyGrailNavLeft = styled.nav`
  border: 2px solid red;
  /* grid-area: nav; */
`;

export const HolyGrailMain = styled.main`
  border: 2px solid yellow;
  /* grid-area: main;
  display: flex;
  align-items: center;
  @media all and (min-width: 768px) {
    min-height: 80vh;
  } */
`;

export const HolyGrailFooter = styled.footer``;
