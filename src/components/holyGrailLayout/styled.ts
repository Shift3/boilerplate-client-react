import styled from 'styled-components';
import {} from '../../utils/colors';

export const HolyGrailWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export const HolyGrailMainWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    flex: 1;
  }
`;

export const HolyGrailLeftAside = styled.aside`
  flex: 0 0 12em;
  order: -1;
`;

export const HolyGrailMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex: 0 0 12em;
  }
`;

export const HolyGrailRightAside = styled.aside`
  flex: 0 0 12em;
  @media (min-width: 768px) {
    flex: 0 0 12em;
  }
`;

export const HolyGrailFooter = styled.footer`
  grid-column: 1 / -1;
  width: 100%;
  order: 3;
  @media (min-width: 768px) {
    flex: 1;
  }
`;
