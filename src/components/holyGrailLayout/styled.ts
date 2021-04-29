import styled from 'styled-components';
import {} from '../../utils/styleValues';

export const HolyGrailWrapper = styled.div`
  border: 1px solid black;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(6, fr);
  grid-template-areas:
    'navbar navbar main main main main'
    'footer footer footer footer footer footer';
`;

export const HolyGrailLeftAside1 = styled.aside`
  grid-area: 'navbar';
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  border: 1px solid red;
  @media (min-width: 768px) {
    flex: 0 0 12em;
  }
`;

export const HolyGrailMain2 = styled.main`
  grid-area: 'main';
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    flex: 1;
  }
`;

export const HolyGrailRightAside3 = styled.aside`
  border: 1px solid green;
  grid-area: 'sidebar';
  border: 1px solid blue;
  @media (min-width: 768px) {
    flex: 0 0 12em;
  }
`;

export const HolyGrailFooter = styled.div`
  grid-area: 'footer';
  border: 1px solid blue;
`;
